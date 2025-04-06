import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EngagementMetrics, ContentType } from '@shared/prisma';

@Injectable()
export class EngagementMetricsService extends BaseService<EngagementMetrics> {
    constructor(prisma: PrismaService) {
        super(prisma, 'engagementMetrics');
    }

    protected getSearchFields(): string[] {
        return ['contentType'];
    }

    protected getIncludeFields(): object {
        return {
            content: true,
        };
    }

    async getMetricsProfile(id: number): Promise<EngagementMetrics> {
        const metrics = await this.prisma.engagementMetrics.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!metrics) {
            throw new NotFoundException('مقاييس التفاعل غير موجودة');
        }
        return metrics;
    }

    async getContentMetrics(contentId: number): Promise<EngagementMetrics[]> {
        const metrics = await this.prisma.engagementMetrics.findMany({
            where: { contentId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return metrics;
    }

    async getMetricsByType(contentType: ContentType): Promise<EngagementMetrics[]> {
        const metrics = await this.prisma.engagementMetrics.findMany({
            where: { contentType },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return metrics;
    }

    async getMetricsByDateRange(startDate: Date, endDate: Date): Promise<EngagementMetrics[]> {
        const metrics = await this.prisma.engagementMetrics.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return metrics;
    }

    async getMetricsAnalytics(contentId: number): Promise<any> {
        const metrics = await this.prisma.engagementMetrics.findMany({
            where: { contentId },

        });

        const analytics = {
            totalViews: metrics.reduce((acc, curr) => acc + (curr.viewCount || 0), 0),
            averageTimeSpent: metrics.reduce((acc, curr) => acc + (curr.avgTimeSpent || 0), 0) / metrics.length,
            averageEngagementRate: metrics.reduce((acc, curr) => acc + (curr.engagementRate || 0), 0) / metrics.length,
            averageBounceRate: metrics.reduce((acc, curr) => acc + (curr.bounceRate || 0), 0) / metrics.length,
            peakHours: this.getPeakHoursDistribution(metrics),
            demographics: this.getDemographicsDistribution(metrics),
        };

        return analytics;
    }

    private getPeakHoursDistribution(metrics: EngagementMetrics[]) {
        const distribution = {};
        metrics.forEach(metric => {
            if (metric.peakHours) {
                Object.entries(metric.peakHours).forEach(([hour, count]) => {
                    distribution[hour] = (distribution[hour] || 0) + count;
                });
            }
        });
        return distribution;
    }

    private getDemographicsDistribution(metrics: EngagementMetrics[]) {
        const distribution = {};
        metrics.forEach(metric => {
            if (metric.demographics) {
                Object.entries(metric.demographics).forEach(([key, value]) => {
                    distribution[key] = (distribution[key] || 0) + value;
                });
            }
        });
        return distribution;
    }
} 