import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductReview } from '@shared/prisma';

@Injectable()
export class ProductReviewService extends BaseService<ProductReview> {
    constructor(prisma: PrismaService) {
        super(prisma, 'productReview');
    }

    protected getSearchFields(): string[] {
        return ['comment'];
    }

    protected getIncludeFields(): any {
        return {
            product: true,
            user: true,
        };
    }

    async getReviewProfile(id: number): Promise<ProductReview> {
        const review = await this.prisma.productReview.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!review) {
            throw new NotFoundException('تقييم المنتج غير موجود');
        }
        return review;
    }

    async getProductReviews(productId: number): Promise<ProductReview[]> {
        return this.prisma.productReview.findMany({
            where: { productId },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async getUserReviews(userId: number): Promise<ProductReview[]> {
        return this.prisma.productReview.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async getProductAverageRating(productId: number): Promise<number> {
        const reviews = await this.getProductReviews(productId);
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    }

    async verifyReview(id: number): Promise<ProductReview> {
        const review = await this.getReviewProfile(id);
        return this.prisma.productReview.update({
            where: { id },
            data: { verified: true },
        });
    }

    async updateReviewImages(id: number, images: string[]): Promise<ProductReview> {
        const review = await this.getReviewProfile(id);
        return this.prisma.productReview.update({
            where: { id },
            data: { images },
        });
    }
} 