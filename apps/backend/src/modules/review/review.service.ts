import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from '@/dtos/Review.create.dto';
import { UpdateReviewDto } from '@/dtos/Review.update.dto';
import { ProductReview, Review } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { Prisma } from '@shared/prisma';
@Injectable()
export class ReviewService extends BaseService<Review> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'review');
    }

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        return this.prisma.review.create({
            data: {
                ...createReviewDto,
            },
            include: {
                reviewer: true,
                reviewed: true,
            },
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<Review>> {
        const { take, skip, search } = params;
        const where: Prisma.ReviewWhereInput = search ? {
            OR: [
                { comment: { contains: search, mode: 'insensitive' } },
                { reviewer: { name: { contains: search, mode: 'insensitive' } } },
            ],
        } : {};
        const [data, total] = await this.prisma.$transaction([
            this.prisma.review.findMany({
                where,
                include: {
                    reviewer: true,
                    reviewed: true,
                },
                skip,
                take,
            }),
            this.prisma.review.count({ where }),
        ]);
        return { data, meta: { total, skip: skip || 0, take: take || 10, hasMore: (skip || 0) + (take || 10) < total } };
    }

    async findOne(id: number): Promise<Review> {
        const review = await this.prisma.review.findUnique({
            where: { id },
            include: {
                reviewer: true,
                reviewed: true,
            },
        });

        if (!review) {
            throw new NotFoundException(`التقييم رقم ${id} غير موجود`);
        }

        return review;
    }

    async findByProduct(productId: number): Promise<ProductReview[]> {
        return this.prisma.productReview.findMany({
            where: { productId },
            include: {
                product: true,
                user: true,
            },
        });
    }

    async findByUser(userId: number): Promise<ProductReview[]> {
        return this.prisma.productReview.findMany({
            where: { userId },
            include: {
                product: true,
                user: true,
            },
        });
    }

    async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
        try {
            return await this.prisma.review.update({
                where: { id },
                data: updateReviewDto,
                include: {
                    reviewer: true,
                    reviewed: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`التقييم رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<Review> {
        try {
            return await this.prisma.review.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`التقييم رقم ${id} غير موجود`);
        }
    }
} 