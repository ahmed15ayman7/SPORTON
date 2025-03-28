import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductVariant } from '@prisma/client';

@Injectable()
export class ProductVariantService extends BaseService<ProductVariant> {
    constructor(prisma: PrismaService) {
        super(prisma, 'productVariant');
    }

    protected getSearchFields(): string[] {
        return ['sku', 'size', 'color'];
    }

    protected getIncludeFields(): any {
        return {
            product: true,
        };
    }

    async getVariantProfile(id: number): Promise<ProductVariant> {
        const variant = await this.prisma.productVariant.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!variant) {
            throw new NotFoundException('متغير المنتج غير موجود');
        }
        return variant;
    }

    async getProductVariants(productId: number): Promise<ProductVariant[]> {
        return this.prisma.productVariant.findMany({
            where: { productId },
            include: this.getIncludeFields(),
        });
    }

    async getVariantBySku(sku: string): Promise<ProductVariant> {
        const variant = await this.prisma.productVariant.findUnique({
            where: { sku },
            include: this.getIncludeFields(),
        });
        if (!variant) {
            throw new NotFoundException('متغير المنتج غير موجود');
        }
        return variant;
    }

    async updateStock(id: number, quantity: number): Promise<ProductVariant> {
        const variant = await this.getVariantProfile(id);
        return this.prisma.productVariant.update({
            where: { id },
            data: { inStock: quantity },
        });
    }

    async updatePrice(id: number, price: number): Promise<ProductVariant> {
        const variant = await this.getVariantProfile(id);
        return this.prisma.productVariant.update({
            where: { id },
            data: { price },
        });
    }
} 