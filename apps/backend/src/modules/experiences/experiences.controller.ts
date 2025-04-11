import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { ExperiencesService } from './experiences.service';
import { Experience } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateExperienceDto } from '@/dtos/Experience.create.dto';
import { UpdateExperienceDto } from '@/dtos/Experience.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController extends BaseController<Experience> {
    constructor(private readonly experiencesService: ExperiencesService) {
        super(experiencesService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء خبرة جديدة', 'create', CreateExperienceDto, null, "الخبرات")
    async create(@Body() createExperienceDto: CreateExperienceDto) {
        return this.experiencesService.create(createExperienceDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث خبرة محددة', 'update', UpdateExperienceDto, null, "الخبرات")
    async update(@Param('id') id: number, @Body() data: any) {
        return this.experiencesService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الخبرات', 'none', null, null, "الخبرات")
    async findAll(@Query() query: PaginationDto) {
        return this.experiencesService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الخبرة محددة', 'none', null, null, "الخبرات")
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.experiencesService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الخبرة مع جميع العلاقات', 'none', null, null, "الخبرات")
    async getExperienceProfile(@Param('id', ParseIntPipe) id: number) {
        return this.experiencesService.getExperienceProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الخبرات المستخدمة', 'none', null, null, "الخبرات")
    async getUserExperiences(@Param('userId', ParseIntPipe) userId: number) {
        return this.experiencesService.getUserExperiences(userId);
    }

    @Get('current/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الخبرات الحالية للمستخدم', 'none', null, null, "الخبرات")
    async getCurrentExperiences(@Param('userId', ParseIntPipe) userId: number) {
        return this.experiencesService.getCurrentExperiences(userId);
    }

} 