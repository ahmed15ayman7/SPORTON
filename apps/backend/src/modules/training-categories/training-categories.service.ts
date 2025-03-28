import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TrainingCategory } from '@prisma/client';

@Injectable()
export class TrainingCategoriesService extends BaseService<TrainingCategory> {
    constructor(prisma: PrismaService) {
        super(prisma, 'trainingCategory');
    }

    protected getSearchFields(): string[] {
        return ['name', 'description'];
    }

    protected getIncludeFields(): object {
        return {
            trainings: true,
        };
    }

    async getTrainingCategoryProfile(id: number): Promise<TrainingCategory> {
        const category = await this.prisma.trainingCategory.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!category) {
            throw new NotFoundException('فئة التدريب غير موجودة');
        }
        return category;
    }

    async getCategoryTrainings(id: number) {
        const category = await this.prisma.trainingCategory.findUnique({
            where: { id },
            include: {
                trainings: {
                    include: {
                        coach: true,
                        players: true,
                    },
                    orderBy: {
                        date: 'desc',
                    },
                },
            },
        });
        if (!category) {
            throw new NotFoundException('فئة التدريب غير موجودة');
        }
        return category.trainings;
    }

    async getCategoryStats(id: number) {
        const category = await this.prisma.trainingCategory.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        trainings: true,
                    },
                },
                trainings: {
                    select: {
                        price: true,
                        capacity: true,
                        level: true,
                    },
                },
            },
        });
        if (!category) {
            throw new NotFoundException('فئة التدريب غير موجودة');
        }

        const stats = {
            totalTrainings: category._count.trainings,
            averagePrice: category.trainings.reduce((acc, curr) => acc + (curr.price || 0), 0) / category.trainings.length || 0,
            totalCapacity: category.trainings.reduce((acc, curr) => acc + curr.capacity, 0),
            levelDistribution: category.trainings.reduce((acc, curr) => {
                acc[curr.level] = (acc[curr.level] || 0) + 1;
                return acc;
            }, {}),
        };

        return stats;
    }
} 