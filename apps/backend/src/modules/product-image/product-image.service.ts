import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductImage } from '@prisma/client';

@Injectable()
export class ProductImageService extends BaseService<ProductImage> {
    constructor(prisma: PrismaService) {
        super(prisma, 'productImage');
    }

    protected getSearchFields(): string[] {
        return ['url'];
    }

    protected getIncludeFields(): any {
        return {
            product: true,
        };
    }

    async getImageProfile(id: number): Promise<ProductImage> {
        const image = await this.prisma.productImage.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!image) {
            throw new NotFoundException('صورة المنتج غير موجودة');
        }
        return image;
    }

    async getProductImages(productId: number): Promise<ProductImage[]> {
        return this.prisma.productImage.findMany({
            where: { productId },
            include: this.getIncludeFields(),
            orderBy: { order: 'asc' },
        });
    }

    async getMainProductImage(productId: number): Promise<ProductImage> {
        const image = await this.prisma.productImage.findFirst({
            where: {
                productId,
                isMain: true,
            },
            include: this.getIncludeFields(),
        });
        if (!image) {
            throw new NotFoundException('الصورة الرئيسية للمنتج غير موجودة');
        }
        return image;
    }

    async updateImageOrder(id: number, order: number): Promise<ProductImage> {
        const image = await this.getImageProfile(id);
        return this.prisma.productImage.update({
            where: { id },
            data: { order },
        });
    }

    async setMainImage(id: number): Promise<ProductImage> {
        const image = await this.getImageProfile(id);

        // إلغاء تعيين الصورة الرئيسية السابقة
        await this.prisma.productImage.updateMany({
            where: {
                productId: image.productId,
                isMain: true,
            },
            data: { isMain: false },
        });

        // تعيين الصورة الجديدة كصورة رئيسية
        return this.prisma.productImage.update({
            where: { id },
            data: { isMain: true },
        });
    }
} 