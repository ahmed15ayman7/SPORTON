import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AthleteMetrics } from '@shared/prisma';

@Injectable()
export class AthleteMetricsService extends BaseService<AthleteMetrics> {
    constructor(prisma: PrismaService) {
        super(prisma, 'athleteMetrics');
    }

    protected getSearchFields(): string[] {
        return [];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getAthleteMetricsProfile(id: number): Promise<AthleteMetrics> {
        const metrics = await this.prisma.athleteMetrics.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!metrics) {
            throw new NotFoundException('مقاييس الرياضي غير موجودة');
        }
        return metrics;
    }

    async getUserAthleteMetrics(userId: number): Promise<AthleteMetrics> {
        const metrics = await this.prisma.athleteMetrics.findUnique({
            where: { userId },
            include: this.getIncludeFields(),
        });
        if (!metrics) {
            throw new NotFoundException('لم يتم العثور على مقاييس للرياضي');
        }
        return metrics;
    }

    async updateAthleteMetrics(userId: number, data: any): Promise<AthleteMetrics> {
        const metrics = await this.prisma.athleteMetrics.upsert({
            where: { userId },
            update: data,
            create: { ...data, userId },
            include: this.getIncludeFields(),
        });
        return metrics;
    }

    async getAthletesByHeightRange(minHeight: number, maxHeight: number): Promise<AthleteMetrics[]> {
        const metrics = await this.prisma.athleteMetrics.findMany({
            where: {
                height: {
                    gte: minHeight,
                    lte: maxHeight,
                },
            },
            include: this.getIncludeFields(),
        });
        return metrics;
    }

    async getAthletesByWeightRange(minWeight: number, maxWeight: number): Promise<AthleteMetrics[]> {
        const metrics = await this.prisma.athleteMetrics.findMany({
            where: {
                weight: {
                    gte: minWeight,
                    lte: maxWeight,
                },
            },
            include: this.getIncludeFields(),
        });
        return metrics;
    }
} 