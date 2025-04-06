import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '@shared/prisma';
import { Sport } from '@shared/prisma';

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(prisma: PrismaService) {
        super(prisma, 'product');
    }

    protected getSearchFields(): string[] {
        return ['name', 'description', 'brand'];
    }

    protected getIncludeFields(): any {
        return {
            images: true,
            category: true,
            variants: true,
            reviews: true,
        };
    }

    async getProductProfile(id: number): Promise<Product> {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!product) {
            throw new NotFoundException('المنتج غير موجود');
        }
        return product;
    }

    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: { categoryId },
            include: this.getIncludeFields(),
        });
    }

    async getProductsBySport(sport: Sport): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: { sport },
            include: this.getIncludeFields(),
        });
    }

    async getFeaturedProducts(): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: { featured: true },
            include: this.getIncludeFields(),
        });
    }

    async getProductsByBrand(brand: string): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: { brand },
            include: this.getIncludeFields(),
        });
    }

    async getProductsInStock(): Promise<Product[]> {
        return this.prisma.product.findMany({
            where: { inStock: { gt: 0 } },
            include: this.getIncludeFields(),
        });
    }

    async updateStock(id: number, quantity: number): Promise<Product> {
        const product = await this.getProductProfile(id);
        return this.prisma.product.update({
            where: { id },
            data: { inStock: product.inStock + quantity },
        });
    }
} 