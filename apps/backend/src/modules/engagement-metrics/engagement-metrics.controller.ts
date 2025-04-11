import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EngagementMetricsService } from './engagement-metrics.service';
import { CreateEngagementMetricsDto } from '@/dtos/EngagementMetrics.create.dto';
import { UpdateEngagementMetricsDto } from '@/dtos/EngagementMetrics.update.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { EngagementMetrics, ContentType } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('مقاييس التفاعل')
@Controller('engagement-metrics')
export class EngagementMetricsController extends BaseController<EngagementMetrics> {
    constructor(private readonly engagementMetricsService: EngagementMetricsService) {
        super(engagementMetricsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء مقاييس تفاعل جديدة', 'create', CreateEngagementMetricsDto, null, "مقاييس التفاعل")
    create(@Body() createEngagementMetricsDto: CreateEngagementMetricsDto) {
        return this.engagementMetricsService.create(createEngagementMetricsDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث مقاييس تفاعل موجودة', 'update', UpdateEngagementMetricsDto, null, "مقاييس التفاعل")
    update(@Param('id') id: number, @Body() data: any) {
        return this.engagementMetricsService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع مقاييس التفاعل', 'none', null, null, "مقاييس التفاعل")
    findAll(@Query() paginationDto: PaginationDto) {
        return this.engagementMetricsService.findAll(paginationDto);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مقاييس تفاعل معينة', 'none', null, null, "مقاييس التفاعل")
    findOne(@Param('id') id: number) {
        return this.engagementMetricsService.findOne(+id);
    }

    @Get('content/:contentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع مقاييس التفاعل لمحتوى معين', 'none', null, null, "مقاييس التفاعل")
    getContentMetrics(@Param('contentId') contentId: string): Promise<EngagementMetrics[]> {
        return this.engagementMetricsService.getContentMetrics(+contentId);
    }

    @Get('type/:contentType')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع مقاييس التفاعل حسب نوع المحتوى', 'none', null, null, "مقاييس التفاعل")
    getMetricsByType(@Param('contentType') contentType: ContentType): Promise<EngagementMetrics[]> {
        return this.engagementMetricsService.getMetricsByType(contentType);
    }

    @Get('date-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع مقاييس التفاعل في نطاق تاريخ معين', 'none', null, null, "مقاييس التفاعل")
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تحليلات مقاييس التفاعل لمحتوى معين', 'none', null, null, "مقاييس التفاعل")
    getMetricsAnalytics(@Param('contentId') contentId: string) {
        return this.engagementMetricsService.getMetricsAnalytics(+contentId);
    }
} 