import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AdAnalytics } from '@prisma/client';

@Injectable()
export class AdAnalyticsService extends BaseService<AdAnalytics> {
    constructor(prisma: PrismaService) {
        super(prisma, 'adAnalytics');
    }

    protected getSearchFields(): string[] {
        return ['adId'];
    }

    protected getIncludeFields(): object {
        return {
            ad: true,
        };
    }

    async getAdAnalyticsProfile(id: number): Promise<AdAnalytics> {
        const analytics = await this.prisma.adAnalytics.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!analytics) {
            throw new NotFoundException('تحليلات الإعلان غير موجودة');
        }
        return analytics;
    }

    async getAdAnalytics(adId: number): Promise<AdAnalytics> {
        const analytics = await this.prisma.adAnalytics.findFirst({
            where: { adId },
            include: this.getIncludeFields(),
        });
        if (!analytics) {
            throw new NotFoundException('تحليلات الإعلان غير موجودة');
        }
        return analytics;
    }

    async incrementConversions(id: number): Promise<AdAnalytics> {
        const analytics = await this.prisma.adAnalytics.update({
            where: { id },
            data: {
                conversions: {
                    increment: 1,
                },
            },
            include: this.getIncludeFields(),
        });
        return analytics;
    }

    async updateCTR(id: number, ctr: number): Promise<AdAnalytics> {
        const analytics = await this.prisma.adAnalytics.update({
            where: { id },
            data: {
                ctr,
            },
            include: this.getIncludeFields(),
        });
        return analytics;
    }

    async updateEngagement(id: number, engagement: number): Promise<AdAnalytics> {
        const analytics = await this.prisma.adAnalytics.update({
            where: { id },
            data: {
                engagement,
            },
            include: this.getIncludeFields(),
        });
        return analytics;
    }

    async incrementReach(id: number): Promise<AdAnalytics> {
        const analytics = await this.prisma.adAnalytics.update({
            where: { id },
            data: {
                reach: {
                    increment: 1,
                },
            },
            include: this.getIncludeFields(),
        });
        return analytics;
    }
} 