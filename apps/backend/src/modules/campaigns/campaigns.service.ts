import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Campaign } from '@prisma/client';

@Injectable()
export class CampaignsService extends BaseService<Campaign> {
    constructor(prisma: PrismaService) {
        super(prisma, 'campaign');
    }

    protected getSearchFields(): string[] {
        return ['name', 'description'];
    }

    protected getIncludeFields(): object {
        return {
            advertisements: true,
            analytics: true,
        };
    }

    async getCampaignProfile(id: number): Promise<Campaign> {
        const campaign = await this.prisma.campaign.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!campaign) {
            throw new NotFoundException('الحملة غير موجودة');
        }
        return campaign;
    }

    async getActiveCampaigns(): Promise<Campaign[]> {
        const now = new Date();
        return this.prisma.campaign.findMany({
            where: {
                status: 'ACTIVE',
                startDate: {
                    lte: now,
                },
                endDate: {
                    gte: now,
                },
            },
            include: this.getIncludeFields(),
        });
    }

    async getCampaignAnalytics(id: number) {
        const campaign = await this.prisma.campaign.findUnique({
            where: { id },
            include: {
                analytics: true,
            },
        });
        if (!campaign) {
            throw new NotFoundException('الحملة غير موجودة');
        }
        return campaign.analytics;
    }

    async updateCampaignStatus(id: number, status: string): Promise<Campaign> {
        const campaign = await this.prisma.campaign.update({
            where: { id },
            data: {
                status,
            },
            include: this.getIncludeFields(),
        });
        return campaign;
    }

    async getCampaignBudget(id: number): Promise<number> {
        const campaign = await this.prisma.campaign.findUnique({
            where: { id },
            select: {
                budget: true,
            },
        });
        if (!campaign) {
            throw new NotFoundException('الحملة غير موجودة');
        }
        return campaign.budget;
    }

    async getCampaignAdvertisements(id: number) {
        const campaign = await this.prisma.campaign.findUnique({
            where: { id },
            include: {
                advertisements: true,
            },
        });
        if (!campaign) {
            throw new NotFoundException('الحملة غير موجودة');
        }
        return campaign.advertisements;
    }
} 