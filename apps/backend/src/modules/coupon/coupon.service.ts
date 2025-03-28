import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
    constructor(private prisma: PrismaService) { }

    async create(createCouponDto: CreateCouponDto) {
        const { code, productIds = [] } = createCouponDto;

        // التحقق من عدم وجود كوبون بنفس الرمز
        const existingCoupon = await this.prisma.coupon.findUnique({
            where: { code },
        });

        if (existingCoupon) {
            throw new BadRequestException(`الكوبون برمز ${code} موجود بالفعل`);
        }

        // التحقق من وجود المنتجات إذا تم تحديدها
        if (productIds.length > 0) {
            const products = await this.prisma.product.findMany({
                where: {
                    id: {
                        in: productIds,
                    },
                },
            });

            if (products.length !== productIds.length) {
                throw new BadRequestException('بعض المنتجات غير موجودة');
            }
        }

        return this.prisma.coupon.create({
            data: {
                ...createCouponDto,
                products: {
                    connect: productIds.map(id => ({ id })),
                },
            },
            include: {
                products: true,
            },
        });
    }

    async findAll() {
        return this.prisma.coupon.findMany({
            include: {
                products: true,
            },
        });
    }

    async findOne(id: number) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });

        if (!coupon) {
            throw new NotFoundException(`الكوبون رقم ${id} غير موجود`);
        }

        return coupon;
    }

    async findByCode(code: string) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { code },
            include: {
                products: true,
            },
        });

        if (!coupon) {
            throw new NotFoundException(`الكوبون برمز ${code} غير موجود`);
        }

        return coupon;
    }

    async validateCoupon(code: string, orderAmount: number) {
        const coupon = await this.prisma.coupon.findUnique({
            where: { code },
            include: {
                products: true,
            },
        });

        if (!coupon) {
            throw new NotFoundException(`الكوبون برمز ${code} غير موجود`);
        }

        // التحقق من صلاحية الكوبون
        const now = new Date();
        if (now < coupon.startDate || now > coupon.endDate) {
            throw new BadRequestException('الكوبون غير صالح في هذا الوقت');
        }

        // التحقق من الحد الأدنى للطلب
        if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
            throw new BadRequestException(`الحد الأدنى للطلب هو ${coupon.minOrderAmount}`);
        }

        // التحقق من عدد مرات الاستخدام
        if (coupon.usageLimit) {
            const usageCount = await this.prisma.couponUsage.count({
                where: { couponId: coupon.id },
            });

            if (usageCount >= coupon.usageLimit) {
                throw new BadRequestException('تم تجاوز الحد الأقصى لاستخدام الكوبون');
            }
        }

        // حساب قيمة الخصم
        let discountAmount = (orderAmount * coupon.discountPercentage) / 100;

        // التحقق من الحد الأقصى للخصم
        if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
            discountAmount = coupon.maxDiscountAmount;
        }

        return {
            isValid: true,
            discountAmount,
            coupon,
        };
    }

    async applyCoupon(code: string, orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: true,
            },
        });

        if (!order) {
            throw new NotFoundException(`الطلب رقم ${orderId} غير موجود`);
        }

        const validationResult = await this.validateCoupon(code, order.totalAmount);
        const { discountAmount, coupon } = validationResult;

        // تسجيل استخدام الكوبون
        await this.prisma.couponUsage.create({
            data: {
                couponId: coupon.id,
                orderId: order.id,
                discountAmount,
            },
        });

        // تحديث مبلغ الطلب
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                totalAmount: order.totalAmount - discountAmount,
            },
        });
    }

    async deactivate(id: number) {
        try {
            return await this.prisma.coupon.update({
                where: { id },
                data: {
                    isActive: false,
                },
            });
        } catch (error) {
            throw new NotFoundException(`الكوبون رقم ${id} غير موجود`);
        }
    }

    async getActiveCoupons() {
        const now = new Date();
        return this.prisma.coupon.findMany({
            where: {
                isActive: true,
                startDate: {
                    lte: now,
                },
                endDate: {
                    gte: now,
                },
            },
            include: {
                products: true,
            },
        });
    }

    async update(id: number, updateCouponDto: UpdateCouponDto) {
        try {
            return await this.prisma.coupon.update({
                where: { id },
                data: updateCouponDto,
                include: {
                    products: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`الكوبون رقم ${id} غير موجود`);
        }
    }
} 