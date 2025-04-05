import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TargetingPerformance } from '@prisma/client';

@Injectable()
export class TargetingPerformanceService extends BaseService<TargetingPerformance> {
    constructor(prisma: PrismaService) {
        super(prisma, 'targetingPerformance');
    }

    protected getSearchFields(): string[] {
        return ['performance', 'cost', 'roi'];
    }

    protected getIncludeFields(): object {
        return {
            targeting: true,
            segment: true,
        };
    }

    async getPerformanceProfile(id: number): Promise<TargetingPerformance> {
        const performance = await this.prisma.targetingPerformance.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!performance) {
            throw new NotFoundException('أداء الاستهداف غير موجود');
        }
        return performance;
    }

    async getTargetingPerformance(targetingId: number) {
        const performance = await this.prisma.targetingPerformance.findMany({
            where: { targetingId },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return performance;
    }

    async getSegmentPerformance(segmentId: number) {
        const performance = await this.prisma.targetingPerformance.findMany({
            where: { segmentId },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return performance;
    }

    async getPerformanceAnalytics(id: number): Promise<TargetingPerformance> {
        const performance = await this.prisma.targetingPerformance.findUnique({
            where: { id },
            include: {
                targeting: true,
                segment: true,
            },
        });

        if (!performance) {
            throw new NotFoundException('أداء الاستهداف غير موجود');
        }

        return performance;
    }
} 