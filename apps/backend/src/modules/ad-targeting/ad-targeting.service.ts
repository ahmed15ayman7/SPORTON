import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AdTargeting } from '@prisma/client';

@Injectable()
export class AdTargetingService extends BaseService<AdTargeting> {
    constructor(prisma: PrismaService) {
        super(prisma, 'adTargeting');
    }

    protected getSearchFields(): string[] {
        return ['bidStrategy', 'targetInterests', 'targetBehaviors'];
    }

    protected getIncludeFields(): object {
        return {
            advertisement: true,
            targetSegments: true,
            TargetingPerformance: true,
        };
    }

    async getTargetingProfile(id: number): Promise<AdTargeting> {
        const targeting = await this.prisma.adTargeting.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!targeting) {
            throw new NotFoundException('استهداف الإعلان غير موجود');
        }
        return targeting;
    }

    async getAdTargeting(adId: number): Promise<AdTargeting[]> {
        const targeting = await this.prisma.adTargeting.findMany({
            where: { adId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return targeting;
    }

    async getTargetingByInterests(interests: string[]): Promise<AdTargeting[]> {
        const targeting = await this.prisma.adTargeting.findMany({
            where: {
                targetInterests: {
                    hasSome: interests,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return targeting;
    }

    async getTargetingByBehaviors(behaviors: string[]): Promise<AdTargeting[]> {
        const targeting = await this.prisma.adTargeting.findMany({
            where: {
                targetBehaviors: {
                    hasSome: behaviors,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return targeting;
    }

    async getTargetingPerformance(id: number): Promise<any> {
        const targeting = await this.prisma.adTargeting.findUnique({
            where: { id },
            include: {
                TargetingPerformance: {
                    include: {
                        segment: true,
                    },
                    orderBy: {
                        date: 'desc',
                    },
                },
            },
        });

        if (!targeting) {
            throw new NotFoundException('استهداف الإعلان غير موجود');
        }

        const performance = {
            totalPerformance: targeting.TargetingPerformance.reduce((acc, curr) => acc + curr.performance, 0),
            averagePerformance: targeting.TargetingPerformance.reduce((acc, curr) => acc + curr.performance, 0) / targeting.TargetingPerformance.length,
            totalCost: targeting.TargetingPerformance.reduce((acc, curr) => acc + curr.cost, 0),
            averageROI: targeting.TargetingPerformance.reduce((acc, curr) => acc + curr.roi, 0) / targeting.TargetingPerformance.length,
            segmentPerformance: this.getSegmentPerformance(targeting.TargetingPerformance),
        };

        return performance;
    }

    private getSegmentPerformance(performance: any[]) {
        const segmentPerformance = {};
        performance.forEach(p => {
            const segmentKey = `${p.segment.name}`;
            if (!segmentPerformance[segmentKey]) {
                segmentPerformance[segmentKey] = {
                    performance: 0,
                    cost: 0,
                    roi: 0,
                    count: 0,
                };
            }
            segmentPerformance[segmentKey].performance += p.performance;
            segmentPerformance[segmentKey].cost += p.cost;
            segmentPerformance[segmentKey].roi += p.roi;
            segmentPerformance[segmentKey].count += 1;
        });

        // حساب المتوسطات
        Object.keys(segmentPerformance).forEach(key => {
            const count = segmentPerformance[key].count;
            segmentPerformance[key].performance /= count;
            segmentPerformance[key].roi /= count;
        });

        return segmentPerformance;
    }
} 