import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CampaignAnalyticsService } from './campaign-analytics.service';
import { CreateCampaignAnalyticsDto } from '../../dtos/CampaignAnalytics.create.dto';
import { UpdateCampaignAnalyticsDto } from '../../dtos/CampaignAnalytics.update.dto';
import { CampaignAnalytics } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('تحليلات الحملات')
@Controller('campaign-analytics')
export class CampaignAnalyticsController {
    constructor(private readonly campaignAnalyticsService: CampaignAnalyticsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCampaignAnalyticsDto, "تحليلات الحملات")
    @ApiOperation({ summary: 'إنشاء تحليلات حملة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء تحليلات الحملة بنجاح' })
    create(@Body() createCampaignAnalyticsDto: CreateCampaignAnalyticsDto) {
        return this.campaignAnalyticsService.create(createCampaignAnalyticsDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCampaignAnalyticsDto, null, "تحليلات الحملات")
    update(@Param('id') id: number, @Body() updateCampaignAnalyticsDto: UpdateCampaignAnalyticsDto) {
        return this.campaignAnalyticsService.update(id, updateCampaignAnalyticsDto);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "تحليلات الحملات")
    async findOne(@Param('id') id: number): Promise<CampaignAnalytics> {
        return this.campaignAnalyticsService.findOne(id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "تحليلات الحملات")
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<CampaignAnalytics>> {
        return this.campaignAnalyticsService.findAll(search);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تفاصيل تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل تحليلات الحملة بنجاح' })
    getCampaignAnalyticsProfile(@Param('id') id: string) {
        return this.campaignAnalyticsService.getCampaignAnalyticsProfile(+id);
    }

    @Get('campaign/:campaignId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تحليلات حملة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الحملة بنجاح' })
    getCampaignAnalytics(@Param('campaignId') campaignId: string) {
        return this.campaignAnalyticsService.getCampaignAnalytics(+campaignId);
    }

    @Post(':id/reach')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'زيادة عدد الوصول' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد الوصول بنجاح' })
    incrementReach(@Param('id') id: string) {
        return this.campaignAnalyticsService.incrementReach(+id);
    }

    @Patch(':id/engagement')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث نسبة التفاعل' })
    @ApiResponse({ status: 200, description: 'تم تحديث نسبة التفاعل بنجاح' })
    updateEngagement(@Param('id') id: string, @Body('engagement') engagement: number) {
        return this.campaignAnalyticsService.updateEngagement(+id, engagement);
    }

    @Post(':id/conversion')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'زيادة عدد التحويلات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد التحويلات بنجاح' })
    incrementConversions(@Param('id') id: string) {
        return this.campaignAnalyticsService.incrementConversions(+id);
    }

    @Patch(':id/roi')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث العائد على الاستثمار' })
    @ApiResponse({ status: 200, description: 'تم تحديث العائد على الاستثمار بنجاح' })
    updateROI(@Param('id') id: string, @Body('roi') roi: number) {
        return this.campaignAnalyticsService.updateROI(+id, roi);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'حذف تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم حذف تحليلات الحملة بنجاح' })
    remove(@Param('id') id: string) {
        return this.campaignAnalyticsService.remove(+id);
    }
} 