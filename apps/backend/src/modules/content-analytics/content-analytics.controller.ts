import { Controller, Get, Param, Body, Put } from '@nestjs/common';
import { ContentAnalyticsService } from './content-analytics.service';
import { BaseController } from '@/common/controllers/base.controller';
import { ContentAnalytics } from '@shared/prisma';
@Controller('content-analytics')
export class ContentAnalyticsController extends BaseController<ContentAnalytics> {
    constructor(private readonly contentAnalyticsService: ContentAnalyticsService) {
        super(contentAnalyticsService);
    }

    @Get(':id')
    async getContentAnalytics(@Param('id') id: string): Promise<ContentAnalytics[]> {
        return this.contentAnalyticsService.getContentAnalytics(parseInt(id));
    }

    @Get('current/:id')
    async getCurrentContentAnalytics(@Param('id') id: string): Promise<ContentAnalytics | null> {
        return this.contentAnalyticsService.getCurrentContentAnalytics(parseInt(id));
    }

    @Get('upcoming/:id')
    async getUpcomingContentAnalytics(@Param('id') id: string): Promise<ContentAnalytics[]> {
        return this.contentAnalyticsService.getUpcomingContentAnalytics(parseInt(id));
    }

    @Get('completed/:id')
    async getCompletedContentAnalytics(@Param('id') id: string): Promise<ContentAnalytics[]> {
        return this.contentAnalyticsService.getCompletedContentAnalytics(parseInt(id));
    }

    @Put(':id')
    async updateContentAnalytics(@Param('id') id: string, @Body() contentAnalytics: ContentAnalytics): Promise<ContentAnalytics> {
        return this.contentAnalyticsService.updateContentAnalytics(parseInt(id), contentAnalytics);
    }
}