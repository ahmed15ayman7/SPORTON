import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignAnalytics } from '@shared/prisma';

@Injectable()
export class CampaignAnalyticsService extends BaseService<CampaignAnalytics> {
    constructor(prisma: PrismaService) {
        super(prisma, 'campaignAnalytics');
    }

    protected getSearchFields(): string[] {
        return ['campaignId'];
    }

    protected getIncludeFields(): object {
        return {
            campaign: true,
        };
    }

    async getCampaignAnalyticsProfile(id: number): Promise<CampaignAnalytics> {
        const analytics = await this.prisma.campaignAnalytics.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!analytics) {
            throw new NotFoundException('تحليلات الحملة غير موجودة');
        }
        return analytics;
    }

    async getCampaignAnalytics(campaignId: number): Promise<CampaignAnalytics> {
        const analytics = await this.prisma.campaignAnalytics.findFirst({
            where: { campaignId },
            include: this.getIncludeFields(),
        });
        if (!analytics) {
            throw new NotFoundException('تحليلات الحملة غير موجودة');
        }
        return analytics;
    }

    async incrementReach(id: number): Promise<CampaignAnalytics> {
        const analytics = await this.prisma.campaignAnalytics.update({
            where: { id },
            data: {
                totalReach: {
                    increment: 1,
                },
            },
            include: this.getIncludeFields(),
        });
        return analytics;
    }

    async updateEngagement(id: number, engagement: number): Promise<CampaignAnalytics> {
        const analytics = await this.prisma.campaignAnalytics.update({
            where: { id },
            data: {
                engagement,
            },
            include: this.getIncludeFields(),
        });
        return analytics;
    }

    async incrementConversions(id: number): Promise<CampaignAnalytics> {
        const analytics = await this.prisma.campaignAnalytics.update({
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

    async updateROI(id: number, roi: number): Promise<CampaignAnalytics> {
        const analytics = await this.prisma.campaignAnalytics.update({
            where: { id },
            data: {
                roi,
            },
            include: this.getIncludeFields(),
        });
        return analytics;
    }
} 