import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
    constructor(private prisma: PrismaService) { }

    async create(createWishlistDto: CreateWishlistDto) {
        const { userId, productIds = [] } = createWishlistDto;

        return this.prisma.user.update({
            where: { id: userId },
            data: {
                products: {
                    connect: productIds.map(id => ({ id }))
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

    async addProduct(userId: number, productId: number) {
        try {
            return await this.prisma.user.update({
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
        } catch (error) {
            throw new NotFoundException(`المستخدم رقم ${userId} أو المنتج رقم ${productId} غير موجود`);
        }
    }

    async removeProduct(userId: number, productId: number) {
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

    async hasProduct(userId: number, productId: number) {
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

        return user.products.length > 0;
    }

    async update(userId: number, updateWishlistDto: UpdateWishlistDto) {
        const { productIds = [] } = updateWishlistDto;

        try {
            return await this.prisma.user.update({
                where: { id: userId },
                data: {
                    products: {
                        set: productIds.map(id => ({ id }))
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