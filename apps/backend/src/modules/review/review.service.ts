import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) { }

    async create(createReviewDto: CreateReviewDto) {
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

    async findAll() {
        return this.prisma.productReview.findMany({
            include: {
                product: true,
                user: true,
            },
        });
    }

    async findOne(id: number) {
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

    async findByProduct(productId: number) {
        return this.prisma.productReview.findMany({
            where: { productId },
            include: {
                product: true,
                user: true,
            },
        });
    }

    async findByUser(userId: number) {
        return this.prisma.productReview.findMany({
            where: { userId },
            include: {
                product: true,
                user: true,
            },
        });
    }

    async update(id: number, updateReviewDto: UpdateReviewDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.productReview.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`التقييم رقم ${id} غير موجود`);
        }
    }
} 