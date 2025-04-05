import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContentScoreService } from './content-score.service';
import { CreateContentScoreDto } from './dto/create-content-score.dto';
import { UpdateContentScoreDto } from './dto/update-content-score.dto';
import { ContentScore } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('درجة المحتوى')
@Controller('content-score')
export class ContentScoreController {
    constructor(private readonly contentScoreService: ContentScoreService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة درجة محتوى جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة درجة المحتوى بنجاح' })
    async create(@Body() createContentScoreDto: CreateContentScoreDto): Promise<ContentScore> {
        return this.contentScoreService.create(createContentScoreDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع درجات المحتوى' })
    @ApiResponse({ status: 200, description: 'تم جلب درجات المحتوى بنجاح' })
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<ContentScore>> {
        return this.contentScoreService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل درجة محتوى معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل درجة المحتوى بنجاح' })
    async findOne(@Param('id') id: string): Promise<ContentScore> {
        return this.contentScoreService.getScoreProfile(+id);
    }

    @Get('content/:contentId')
    @ApiOperation({ summary: 'الحصول على جميع درجات المحتوى لمحتوى معين' })
    @ApiResponse({ status: 200, description: 'تم جلب درجات المحتوى بنجاح' })
    async getContentScores(@Param('contentId') contentId: string): Promise<ContentScore[]> {
        return this.contentScoreService.getContentScores(+contentId);
    }

    @Get('segment/:userSegment')
    @ApiOperation({ summary: 'الحصول على جميع درجات المحتوى لفئة مستخدم معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب درجات المحتوى بنجاح' })
    async getSegmentScores(@Param('userSegment') userSegment: string): Promise<ContentScore[]> {
        return this.contentScoreService.getSegmentScores(userSegment);
    }

    @Get(':id/analytics')
    @ApiOperation({ summary: 'الحصول على تحليلات درجة محتوى معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات درجة المحتوى بنجاح' })
    async getScoreAnalytics(@Param('id') id: string): Promise<any[]> {
        return this.contentScoreService.getScoreAnalytics(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات درجة محتوى معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات درجة المحتوى بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateContentScoreDto: UpdateContentScoreDto,
    ): Promise<ContentScore> {
        return this.contentScoreService.update(+id, updateContentScoreDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف درجة محتوى معينة' })
    @ApiResponse({ status: 200, description: 'تم حذف درجة المحتوى بنجاح' })
    async remove(@Param('id') id: string): Promise<ContentScore> {
        return this.contentScoreService.remove(+id);
    }
} 