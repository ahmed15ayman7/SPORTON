import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EngagementMetricsService } from './engagement-metrics.service';
import { CreateEngagementMetricsDto } from './dto/create-engagement-metrics.dto';
import { UpdateEngagementMetricsDto } from './dto/update-engagement-metrics.dto';
import { BaseController } from '@/common/controllers/base.controller';
import { EngagementMetrics, ContentType } from '@prisma/client';

@ApiTags('مقاييس التفاعل')
@Controller('engagement-metrics')
export class EngagementMetricsController extends BaseController<EngagementMetrics> {
    constructor(private readonly engagementMetricsService: EngagementMetricsService) {
        super(engagementMetricsService);
    }


    @Get('content/:contentId')
    @ApiOperation({ summary: 'الحصول على جميع مقاييس التفاعل لمحتوى معين' })
    @ApiResponse({ status: 200, description: 'تم جلب مقاييس التفاعل بنجاح' })
    getContentMetrics(@Param('contentId') contentId: string): Promise<EngagementMetrics[]> {
        return this.engagementMetricsService.getContentMetrics(+contentId);
    }

    @Get('type/:contentType')
    @ApiOperation({ summary: 'الحصول على جميع مقاييس التفاعل حسب نوع المحتوى' })
    @ApiResponse({ status: 200, description: 'تم جلب مقاييس التفاعل بنجاح' })
    getMetricsByType(@Param('contentType') contentType: ContentType): Promise<EngagementMetrics[]> {
        return this.engagementMetricsService.getMetricsByType(contentType);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جميع مقاييس التفاعل في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب مقاييس التفاعل بنجاح' })
    getMetricsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<EngagementMetrics[]> {
        return this.engagementMetricsService.getMetricsByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('content/:contentId/analytics')
    @ApiOperation({ summary: 'الحصول على تحليلات مقاييس التفاعل لمحتوى معين' })
    @ApiResponse({ status: 200, description: 'تم جلب التحليلات بنجاح' })
    getMetricsAnalytics(@Param('contentId') contentId: string) {
        return this.engagementMetricsService.getMetricsAnalytics(+contentId);
    }
} 