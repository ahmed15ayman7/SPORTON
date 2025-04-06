import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
@Injectable()
export class CartService extends BaseService<Product> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'Product');
    }

    async create(createCartDto: CreateCartDto): Promise<any> {
        const { userId, items = [] } = createCartDto;

        // التحقق من وجود المستخدم
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }

        // إنشاء عناصر السلة
        const cartItems = await Promise.all(
            items.map(async (item) => {
                const product = await this.prisma.product.findUnique({
                    where: { id: item.productId },
                });

                if (!product) {
                    throw new NotFoundException(`المنتج رقم ${item.productId} غير موجود`);
                }

                if (item.variantId) {
                    const variant = await this.prisma.productVariant.findUnique({
                        where: { id: item.variantId },
                    });

                    if (!variant) {
                        throw new NotFoundException(`متغير المنتج رقم ${item.variantId} غير موجود`);
                    }
                }

                return {
                    productId: item.productId,
                    variantId: item.variantId,
                    quantity: item.quantity,
                };
            })
        );

        // تحديث سلة المستخدم
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                Product: {
                    connect: cartItems.map(item => ({ id: item.productId }))
                }
            },
            include: {
                Product: true
            }
        });
    }

    async findByUser(userId: number): Promise<Product[]> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                Product: true
            }
        });

        if (!user) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }

        return user.Product;
    }

    async addItem(userId: number, productId: number, quantity: number, variantId?: number): Promise<any> {
        // التحقق من وجود المنتج
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException(`المنتج رقم ${productId} غير موجود`);
        }

        // التحقق من وجود المتغير إذا تم تحديده
        if (variantId) {
            const variant = await this.prisma.productVariant.findUnique({
                where: { id: variantId },
            });

            if (!variant) {
                throw new NotFoundException(`متغير المنتج رقم ${variantId} غير موجود`);
            }
        }

        // إضافة المنتج إلى سلة المستخدم
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                Product: {
                    connect: { id: productId }
                }
            },
            include: {
                Product: true
            }
        });
    }

    async updateItemQuantity(userId: number, productId: number, quantity: number): Promise<any> {
        // التحقق من وجود المنتج في السلة
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                Product: {
                    where: { id: productId }
                }
            }
        });

        if (!user) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }

        if (user.Product.length === 0) {
            throw new NotFoundException(`المنتج رقم ${productId} غير موجود في السلة`);
        }

        // تحديث الكمية
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                Product: {
                    connect: { id: productId }
                }
            },
            include: {
                Product: true
            }
        });
    }

    async removeItem(userId: number, productId: number): Promise<any> {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    Product: {
                        disconnect: { id: productId }
                    }
                },
                include: {
                    Product: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`المستخدم رقم ${userId} أو المنتج رقم ${productId} غير موجود`);
        }
    }

    async clearCart(userId: number): Promise<any> {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    Product: {
                        set: []
                    }
                },
                include: {
                    Product: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }
    }

    async calculateTotal(userId: number): Promise<number> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                Product: true
            }
        });

        if (!user) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }

        let total = 0;
        for (const product of user.Product) {
            total += product.price;
        }

        return total;
    }

    async updateUserCart(userId: number, updateCartDto: UpdateCartDto): Promise<any> {
        const { items = [] } = updateCartDto;

        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    Product: {
                        set: items.map(item => ({ id: item.productId }))
                    }
                },
                include: {
                    Product: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }
    }
} 