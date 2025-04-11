import { Controller, Get, Param, Body, Put, UseGuards, Post, Query } from '@nestjs/common';
import { ContentAnalyticsService } from './content-analytics.service';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { ContentAnalytics } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateContentAnalyticsDto } from '@/dtos/ContentAnalytics.create.dto';
import { UpdateContentAnalyticsDto } from '@/dtos/ContentAnalytics.update.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
@Controller('content-analytics')
export class ContentAnalyticsController extends BaseController<ContentAnalytics> {
    constructor(private readonly contentAnalyticsService: ContentAnalyticsService) {
        super(contentAnalyticsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateContentAnalyticsDto, "التحليلات المحتوى")
    async create(@Body() createContentAnalyticsDto: CreateContentAnalyticsDto): Promise<ContentAnalytics> {
        return this.contentAnalyticsService.create(createContentAnalyticsDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateContentAnalyticsDto, null, "التحليلات المحتوى")
    async update(@Param('id') id: number, @Body() data: any): Promise<ContentAnalytics> {
        return this.contentAnalyticsService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالمحتوى', 'none', null, null, "التحليلات المحتوى")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ContentAnalytics>> {
        return this.contentAnalyticsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالمحتوى', 'none', null, null, "التحليلات المحتوى")
    async findOne(@Param('id') id: number): Promise<ContentAnalytics> {
        return this.contentAnalyticsService.findOne(id);
    }

    @Get('current/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالمحتوى الحالي', 'none', null, null, "التحليلات المحتوى")
    async getCurrentContentAnalytics(@Param('id') id: string): Promise<ContentAnalytics | null> {
        return this.contentAnalyticsService.getCurrentContentAnalytics(parseInt(id));
    }

    @Get('upcoming/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالمحتوى القادم', 'none', null, null, "التحليلات المحتوى")
    async getUpcomingContentAnalytics(@Param('id') id: string): Promise<ContentAnalytics[]> {
        return this.contentAnalyticsService.getUpcomingContentAnalytics(parseInt(id));
    }

    @Get('completed/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالمحتوى المكتمل', 'none', null, null, "التحليلات المحتوى")
    async getCompletedContentAnalytics(@Param('id') id: string): Promise<ContentAnalytics[]> {
        return this.contentAnalyticsService.getCompletedContentAnalytics(parseInt(id));
    }

}