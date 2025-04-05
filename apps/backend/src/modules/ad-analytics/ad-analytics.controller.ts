import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdAnalyticsService } from './ad-analytics.service';
import { CreateAdAnalyticsDto } from './dto/create-ad-analytics.dto';
import { UpdateAdAnalyticsDto } from './dto/update-ad-analytics.dto';
import { AdAnalytics } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('تحليلات الإعلانات')
@Controller('ad-analytics')
export class AdAnalyticsController {
    constructor(private readonly adAnalyticsService: AdAnalyticsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء تحليلات إعلان جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء تحليلات الإعلان بنجاح' })
    async create(@Body() createAdAnalyticsDto: CreateAdAnalyticsDto): Promise<AdAnalytics> {
        return this.adAnalyticsService.create(createAdAnalyticsDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع تحليلات الإعلانات' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الإعلانات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<AdAnalytics>> {
        return this.adAnalyticsService.findAll(search);
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل تحليلات الإعلان' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل تحليلات الإعلان بنجاح' })
    async getAdAnalyticsProfile(@Param('id') id: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.getAdAnalyticsProfile(+id);
    }

    @Get('ad/:adId')
    @ApiOperation({ summary: 'الحصول على تحليلات إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الإعلان بنجاح' })
    async getAdAnalytics(@Param('adId') adId: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.getAdAnalytics(+adId);
    }

    @Post(':id/conversion')
    @ApiOperation({ summary: 'زيادة عدد التحويلات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد التحويلات بنجاح' })
    async incrementConversions(@Param('id') id: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.incrementConversions(+id);
    }

    @Patch(':id/ctr')
    @ApiOperation({ summary: 'تحديث معدل النقر' })
    @ApiResponse({ status: 200, description: 'تم تحديث معدل النقر بنجاح' })
    async updateCTR(@Param('id') id: string, @Body('ctr') ctr: number): Promise<AdAnalytics> {
        return this.adAnalyticsService.updateCTR(+id, ctr);
    }

    @Patch(':id/engagement')
    @ApiOperation({ summary: 'تحديث معدل التفاعل' })
    @ApiResponse({ status: 200, description: 'تم تحديث معدل التفاعل بنجاح' })
    async updateEngagement(@Param('id') id: string, @Body('engagement') engagement: number): Promise<AdAnalytics> {
        return this.adAnalyticsService.updateEngagement(+id, engagement);
    }

    @Post(':id/reach')
    @ApiOperation({ summary: 'زيادة عدد الوصول' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد الوصول بنجاح' })
    async incrementReach(@Param('id') id: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.incrementReach(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث تحليلات الإعلان' })
    @ApiResponse({ status: 200, description: 'تم تحديث تحليلات الإعلان بنجاح' })
    async update(@Param('id') id: string, @Body() updateAdAnalyticsDto: UpdateAdAnalyticsDto): Promise<AdAnalytics> {
        return this.adAnalyticsService.update(+id, updateAdAnalyticsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تحليلات الإعلان' })
    @ApiResponse({ status: 200, description: 'تم حذف تحليلات الإعلان بنجاح' })
    async remove(@Param('id') id: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.remove(+id);
    }
} 