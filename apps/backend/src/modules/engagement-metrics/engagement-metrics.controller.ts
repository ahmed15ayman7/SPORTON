import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EngagementMetricsService } from './engagement-metrics.service';
import { CreateEngagementMetricsDto } from './dto/create-engagement-metrics.dto';
import { UpdateEngagementMetricsDto } from './dto/update-engagement-metrics.dto';

@ApiTags('مقاييس التفاعل')
@Controller('engagement-metrics')
export class EngagementMetricsController {
    constructor(private readonly engagementMetricsService: EngagementMetricsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة مقياس تفاعل جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة مقياس التفاعل بنجاح' })
    create(@Body() createEngagementMetricsDto: CreateEngagementMetricsDto) {
        return this.engagementMetricsService.create(createEngagementMetricsDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع مقاييس التفاعل' })
    @ApiResponse({ status: 200, description: 'تم جلب مقاييس التفاعل بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.engagementMetricsService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل مقياس تفاعل معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل مقياس التفاعل بنجاح' })
    findOne(@Param('id') id: string) {
        return this.engagementMetricsService.getMetricsProfile(+id);
    }

    @Get('content/:contentId')
    @ApiOperation({ summary: 'الحصول على جميع مقاييس التفاعل لمحتوى معين' })
    @ApiResponse({ status: 200, description: 'تم جلب مقاييس التفاعل بنجاح' })
    getContentMetrics(@Param('contentId') contentId: string) {
        return this.engagementMetricsService.getContentMetrics(+contentId);
    }

    @Get('type/:contentType')
    @ApiOperation({ summary: 'الحصول على جميع مقاييس التفاعل حسب نوع المحتوى' })
    @ApiResponse({ status: 200, description: 'تم جلب مقاييس التفاعل بنجاح' })
    getMetricsByType(@Param('contentType') contentType: string) {
        return this.engagementMetricsService.getMetricsByType(contentType);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جميع مقاييس التفاعل في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب مقاييس التفاعل بنجاح' })
    getMetricsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
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

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات مقياس تفاعل معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات مقياس التفاعل بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateEngagementMetricsDto: UpdateEngagementMetricsDto,
    ) {
        return this.engagementMetricsService.update(+id, updateEngagementMetricsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مقياس تفاعل معين' })
    @ApiResponse({ status: 200, description: 'تم حذف مقياس التفاعل بنجاح' })
    remove(@Param('id') id: string) {
        return this.engagementMetricsService.remove(+id);
    }
} 