import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TrainingReview } from '@prisma/client';

@Injectable()
export class TrainingReviewsService extends BaseService<TrainingReview> {
    constructor(prisma: PrismaService) {
        super(prisma, 'trainingReview');
    }

    protected getSearchFields(): string[] {
        return ['comment'];
    }

    protected getIncludeFields(): object {
        return {
            training: true,
            reviewer: true,
        };
    }

    async getTrainingReviewProfile(id: number): Promise<TrainingReview> {
        const review = await this.prisma.trainingReview.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!review) {
            throw new NotFoundException('المراجعة غير موجودة');
        }
        return review;
    }

    async getTrainingReviews(trainingId: number) {
        const reviews = await this.prisma.trainingReview.findMany({
            where: { trainingId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reviews;
    }

    async getUserReviews(reviewerId: number) {
        const reviews = await this.prisma.trainingReview.findMany({
            where: { reviewerId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reviews;
    }

    async getAverageRating(trainingId: number) {
        const result = await this.prisma.trainingReview.aggregate({
            where: { trainingId },
            _avg: {
                rating: true,
            },
        });
        return result._avg.rating || 0;
    }

    async getRatingDistribution(trainingId: number): Promise<{ rating: number; count: number }[]> {
        const reviews = await this.prisma.trainingReview.groupBy({
            by: ['rating'],
            where: { trainingId },
            _count: {
                rating: true,
            },
        });
        return reviews.map((review) => ({
            rating: review.rating,
            count: review._count.rating,
        }));
    }
} 