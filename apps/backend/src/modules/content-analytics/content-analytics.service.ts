import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ContentAnalytics } from '@shared/prisma';

@Injectable()
export class ContentAnalyticsService extends BaseService<ContentAnalytics> {
    constructor(prisma: PrismaService) {
        super(prisma, 'contentAnalytics');
    }

    protected getSearchFields(): string[] {
        return ['status'];
    }

    protected getIncludeFields(): object {
        return {
            competition: true,
        };
    }

    async getContentAnalyticsProfile(id: number): Promise<ContentAnalytics> {
        const contentAnalytics = await this.prisma.contentAnalytics.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!contentAnalytics) {
            throw new NotFoundException('التحليل غير موجود');
        }
        return contentAnalytics;
    }

    async getContentAnalytics(contentId: number): Promise<ContentAnalytics[]> {
        const contentAnalytics = await this.prisma.contentAnalytics.findMany({
            where: { contentId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'asc',
            },
        });
        return contentAnalytics;
    }

    async getCurrentContentAnalytics(contentId: number): Promise<ContentAnalytics | null> {
        const currentContentAnalytics = await this.prisma.contentAnalytics.findFirst({
            where: {
                contentId,
            },
            include: this.getIncludeFields(),
        });
        return currentContentAnalytics;
    }

    async getUpcomingContentAnalytics(contentId: number): Promise<ContentAnalytics[]> {
        const upcomingContentAnalytics = await this.prisma.contentAnalytics.findMany({
            where: {
                contentId,
            },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'asc',
            },
        });
        return upcomingContentAnalytics;
    }

    async getCompletedContentAnalytics(contentId: number): Promise<ContentAnalytics[]> {
        const completedContentAnalytics = await this.prisma.contentAnalytics.findMany({
            where: {
                contentId,
            },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'asc',
            },
        });
        return completedContentAnalytics;
    }

    async updateContentAnalytics(id: number, contentAnalytics: ContentAnalytics): Promise<ContentAnalytics> {
        return this.prisma.contentAnalytics.update({
            where: { id },
            data: contentAnalytics,
            include: this.getIncludeFields(),
        });
    }
} 