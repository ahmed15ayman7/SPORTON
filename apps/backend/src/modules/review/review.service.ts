import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProductReview } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { Prisma } from '@shared/prisma';
@Injectable()
export class ReviewService extends BaseService<ProductReview> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'productReview');
    }

    async create(createReviewDto: CreateReviewDto): Promise<ProductReview> {
        return this.prisma.productReview.create({
            data: {
                product: { connect: { id: createReviewDto.productId } },
                user: { connect: { id: createReviewDto.userId } },
                rating: createReviewDto.rating,
                comment: createReviewDto.comment,
                images: createReviewDto.images,
            },
            include: {
                product: true,
                user: true,
            },
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<ProductReview>> {
        const { take, skip, search } = params;
        const where: Prisma.ProductReviewWhereInput = search ? {
            OR: [
                { comment: { contains: search, mode: 'insensitive' } },
                { user: { name: { contains: search, mode: 'insensitive' } } },
            ],
        } : {};
        const [data, total] = await this.prisma.$transaction([
            this.prisma.productReview.findMany({
                where,
                include: {
                    product: true,
                    user: true,
                },
                skip,
                take,
            }),
            this.prisma.productReview.count({ where }),
        ]);
        return { data, meta: { total, skip: skip || 0, take: take || 10, hasMore: (skip || 0) + (take || 10) < total } };
    }

    async findOne(id: number): Promise<ProductReview> {
        const review = await this.prisma.productReview.findUnique({
            where: { id },
            include: {
                product: true,
                user: true,
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

    async update(id: number, updateReviewDto: UpdateReviewDto): Promise<ProductReview> {
        try {
            return await this.prisma.productReview.update({
                where: { id },
                data: updateReviewDto,
                include: {
                    product: true,
                    user: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`التقييم رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<ProductReview> {
        try {
            return await this.prisma.productReview.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`التقييم رقم ${id} غير موجود`);
        }
    }
} 