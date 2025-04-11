import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdAnalyticsService } from './ad-analytics.service';
import { AdAnalytics } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CreateAdAnalyticsDto } from '@/dtos/AdAnalytics.create.dto';
import { UpdateAdAnalyticsDto } from '@/dtos/AdAnalytics.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('تحليلات الإعلانات')
@Controller('ad-analytics')
export class AdAnalyticsController extends BaseController<AdAnalytics> {
    constructor(private readonly adAnalyticsService: AdAnalyticsService) {
        super(adAnalyticsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAdAnalyticsDto, "تحليلات الإعلانات")
    async create(@Body() data: any): Promise<AdAnalytics> {
        return this.adAnalyticsService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAdAnalyticsDto, null, "تحليلات الإعلانات")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<AdAnalytics> {
        return this.adAnalyticsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "تحليلات الإعلانات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<AdAnalytics>> {
        return this.adAnalyticsService.findAll(params);
    }
    @Get(":id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "تحليلات الإعلانات")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<AdAnalytics> {
        return this.adAnalyticsService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تفاصيل تحليلات الإعلان' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل تحليلات الإعلان بنجاح' })
    async getAdAnalyticsProfile(@Param('id') id: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.getAdAnalyticsProfile(+id);
    }

    @Get('ad/:adId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تحليلات إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الإعلان بنجاح' })
    async getAdAnalytics(@Param('adId') adId: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.getAdAnalytics(+adId);
    }

    @Post(':id/conversion')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'زيادة عدد التحويلات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد التحويلات بنجاح' })
    async incrementConversions(@Param('id') id: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.incrementConversions(+id);
    }

    @Patch(':id/ctr')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث معدل النقر' })
    @ApiResponse({ status: 200, description: 'تم تحديث معدل النقر بنجاح' })
    async updateCTR(@Param('id') id: string, @Body('ctr') ctr: number): Promise<AdAnalytics> {
        return this.adAnalyticsService.updateCTR(+id, ctr);
    }

    @Patch(':id/engagement')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث معدل التفاعل' })
    @ApiResponse({ status: 200, description: 'تم تحديث معدل التفاعل بنجاح' })
    async updateEngagement(@Param('id') id: string, @Body('engagement') engagement: number): Promise<AdAnalytics> {
        return this.adAnalyticsService.updateEngagement(+id, engagement);
    }

    @Post(':id/reach')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'زيادة عدد الوصول' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد الوصول بنجاح' })
    async incrementReach(@Param('id') id: string): Promise<AdAnalytics> {
        return this.adAnalyticsService.incrementReach(+id);
    }

} 