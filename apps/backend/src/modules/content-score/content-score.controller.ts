import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContentScoreService } from './content-score.service';
import { CreateContentScoreDto } from '../../dtos/ContentScore.create.dto';
import { UpdateContentScoreDto } from '../../dtos/ContentScore.update.dto';
import { ContentScore } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('درجة المحتوى')
@Controller('content-score')
export class ContentScoreController extends BaseController<ContentScore> {
    constructor(private readonly contentScoreService: ContentScoreService) {
        super(contentScoreService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة درجة محتوى جديدة', 'create', CreateContentScoreDto, null, "درجة المحتوى")
    @ApiOperation({ summary: 'إضافة درجة محتوى جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة درجة المحتوى بنجاح' })
    async create(@Body() createContentScoreDto: CreateContentScoreDto): Promise<ContentScore> {
        return this.contentScoreService.create(createContentScoreDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث درجة محتوى معينة', 'update', UpdateContentScoreDto, null, "درجة المحتوى")
    async update(@Param('id') id: number, @Body() updateContentScoreDto: UpdateContentScoreDto): Promise<ContentScore> {
        return this.contentScoreService.update(+id, updateContentScoreDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع درجات المحتوى', 'none', null, null, "درجة المحتوى")
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<ContentScore>> {
        return this.contentScoreService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل درجة محتوى معينة', 'none', null, null, "درجة المحتوى")
    async findOne(@Param('id') id: number): Promise<ContentScore> {
        return this.contentScoreService.getScoreProfile(+id);
    }

    @Get('content/:contentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على جميع درجات المحتوى لمحتوى معين' })
    @ApiResponse({ status: 200, description: 'تم جلب درجات المحتوى بنجاح' })
    async getContentScores(@Param('contentId') contentId: string): Promise<ContentScore[]> {
        return this.contentScoreService.getContentScores(+contentId);
    }

    @Get('segment/:userSegment')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على جميع درجات المحتوى لفئة مستخدم معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب درجات المحتوى بنجاح' })
    async getSegmentScores(@Param('userSegment') userSegment: string): Promise<ContentScore[]> {
        return this.contentScoreService.getSegmentScores(userSegment);
    }

    @Get(':id/analytics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تحليلات درجة محتوى معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات درجة المحتوى بنجاح' })
    async getScoreAnalytics(@Param('id') id: string): Promise<any[]> {
        return this.contentScoreService.getScoreAnalytics(+id);
    }

} 