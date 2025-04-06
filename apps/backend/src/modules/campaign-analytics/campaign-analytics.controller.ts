import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CampaignAnalyticsService } from './campaign-analytics.service';
import { CreateCampaignAnalyticsDto } from './dto/create-campaign-analytics.dto';
import { UpdateCampaignAnalyticsDto } from './dto/update-campaign-analytics.dto';
import { CampaignAnalytics } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('تحليلات الحملات')
@Controller('campaign-analytics')
export class CampaignAnalyticsController {
    constructor(private readonly campaignAnalyticsService: CampaignAnalyticsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء تحليلات حملة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء تحليلات الحملة بنجاح' })
    create(@Body() createCampaignAnalyticsDto: CreateCampaignAnalyticsDto) {
        return this.campaignAnalyticsService.create(createCampaignAnalyticsDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع تحليلات الحملات' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الحملات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<CampaignAnalytics>> {
        return this.campaignAnalyticsService.findAll(search);
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل تحليلات الحملة بنجاح' })
    getCampaignAnalyticsProfile(@Param('id') id: string) {
        return this.campaignAnalyticsService.getCampaignAnalyticsProfile(+id);
    }

    @Get('campaign/:campaignId')
    @ApiOperation({ summary: 'الحصول على تحليلات حملة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الحملة بنجاح' })
    getCampaignAnalytics(@Param('campaignId') campaignId: string) {
        return this.campaignAnalyticsService.getCampaignAnalytics(+campaignId);
    }

    @Post(':id/reach')
    @ApiOperation({ summary: 'زيادة عدد الوصول' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد الوصول بنجاح' })
    incrementReach(@Param('id') id: string) {
        return this.campaignAnalyticsService.incrementReach(+id);
    }

    @Patch(':id/engagement')
    @ApiOperation({ summary: 'تحديث نسبة التفاعل' })
    @ApiResponse({ status: 200, description: 'تم تحديث نسبة التفاعل بنجاح' })
    updateEngagement(@Param('id') id: string, @Body('engagement') engagement: number) {
        return this.campaignAnalyticsService.updateEngagement(+id, engagement);
    }

    @Post(':id/conversion')
    @ApiOperation({ summary: 'زيادة عدد التحويلات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد التحويلات بنجاح' })
    incrementConversions(@Param('id') id: string) {
        return this.campaignAnalyticsService.incrementConversions(+id);
    }

    @Patch(':id/roi')
    @ApiOperation({ summary: 'تحديث العائد على الاستثمار' })
    @ApiResponse({ status: 200, description: 'تم تحديث العائد على الاستثمار بنجاح' })
    updateROI(@Param('id') id: string, @Body('roi') roi: number) {
        return this.campaignAnalyticsService.updateROI(+id, roi);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم تحديث تحليلات الحملة بنجاح' })
    update(@Param('id') id: string, @Body() updateCampaignAnalyticsDto: UpdateCampaignAnalyticsDto) {
        return this.campaignAnalyticsService.update(+id, updateCampaignAnalyticsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم حذف تحليلات الحملة بنجاح' })
    remove(@Param('id') id: string) {
        return this.campaignAnalyticsService.remove(+id);
    }
} 