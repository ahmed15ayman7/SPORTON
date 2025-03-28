import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) { }

    async create(createCartDto: CreateCartDto) {
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
                products: {
                    connect: cartItems.map(item => ({ id: item.productId }))
                }
            },
            include: {
                products: true
            }
        });
    }

    async findByUser(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                products: true
            }
        });

        if (!user) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }

        return user.products;
    }

    async addItem(userId: number, productId: number, quantity: number, variantId?: number) {
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
                products: {
                    connect: { id: productId }
                }
            },
            include: {
                products: true
            }
        });
    }

    async updateItemQuantity(userId: number, productId: number, quantity: number) {
        // التحقق من وجود المنتج في السلة
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                products: {
                    where: { id: productId }
                }
            }
        });

        if (!user) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }

        if (user.products.length === 0) {
            throw new NotFoundException(`المنتج رقم ${productId} غير موجود في السلة`);
        }

        // تحديث الكمية
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                products: {
                    connect: { id: productId }
                }
            },
            include: {
                products: true
            }
        });
    }

    async removeItem(userId: number, productId: number) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    products: {
                        disconnect: { id: productId }
                    }
                },
                include: {
                    products: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`المستخدم رقم ${userId} أو المنتج رقم ${productId} غير موجود`);
        }
    }

    async clearCart(userId: number) {
        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    products: {
                        set: []
                    }
                },
                include: {
                    products: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }
    }

    async calculateTotal(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                products: true
            }
        });

        if (!user) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }

        let total = 0;
        for (const product of user.products) {
            total += product.price;
        }

        return total;
    }

    async update(userId: number, updateCartDto: UpdateCartDto) {
        const { items = [] } = updateCartDto;

        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    products: {
                        set: items.map(item => ({ id: item.productId }))
                    }
                },
                include: {
                    products: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
        }
    }
} 