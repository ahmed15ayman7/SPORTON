import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamCategoryService } from './team-category.service';
import { TeamCategory } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('فئات الفرق')
@Controller('team-categories')
export class TeamCategoryController {
    constructor(private readonly teamCategoryService: TeamCategoryService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء فئة فريق جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء فئة الفريق بنجاح' })
    create(@Body() createTeamCategoryDto: TeamCategory) {
        return this.teamCategoryService.create(createTeamCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع فئات الفرق' })
    @ApiResponse({ status: 200, description: 'تم جلب فئات الفرق بنجاح' })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.teamCategoryService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على فئة فريق محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب فئة الفريق بنجاح' })
    findOne(@Param('id') id: string) {
        return this.teamCategoryService.findOne(+id);
    }

    @Get('age-range/:minAge/:maxAge')
    @ApiOperation({ summary: 'الحصول على فئات الفرق ضمن نطاق عمر محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب فئات الفرق بنجاح' })
    findByAgeRange(
        @Param('minAge') minAge: string,
        @Param('maxAge') maxAge: string,
    ) {
        return this.teamCategoryService.findByAgeRange(+minAge, +maxAge);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث فئة فريق محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث فئة الفريق بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateTeamCategoryDto: TeamCategory,
    ) {
        return this.teamCategoryService.update(+id, updateTeamCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف فئة فريق محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف فئة الفريق بنجاح' })
    remove(@Param('id') id: string) {
        return this.teamCategoryService.remove(+id);
    }
} 