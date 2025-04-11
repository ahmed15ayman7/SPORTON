import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { EducationService } from './education.service';
import { Education } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateEducationDto } from '@/dtos/Education.create.dto';
import { UpdateEducationDto } from '@/dtos/Education.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('education')
@Controller('education')
export class EducationController extends BaseController<Education> {
    constructor(private readonly educationService: EducationService) {
        super(educationService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء تعليم جديد', 'create', CreateEducationDto, null, "التعليم")
    async create(@Body() createEducationDto: CreateEducationDto) {
        return this.educationService.create(createEducationDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تعليم معين', 'update', UpdateEducationDto, null, "التعليم")
    async update(@Param('id') id: number, @Body() data: any) {
        return this.educationService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التعليمات', 'none', null, null, "التعليم")
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.educationService.findAll(paginationDto);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تعليم معين', 'none', null, null, "التعليم")
    async findOne(@Param('id') id: number) {
        return this.educationService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على التعليم بجميع العلاقات', 'none', null, null, "التعليم")
    async getEducationProfile(@Param('id', ParseIntPipe) id: number) {
        return this.educationService.getEducationProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على التعليم بالمستخدم', 'none', null, null, "التعليم")
    async getUserEducation(@Param('userId', ParseIntPipe) userId: number) {
        return this.educationService.getUserEducation(userId);
    }

    @Get('latest/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على التعليم الأخير بالمستخدم', 'none', null, null, "التعليم")
    async getLatestEducation(@Param('userId', ParseIntPipe) userId: number) {
        return this.educationService.getLatestEducation(userId);
    }

} 