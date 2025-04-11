import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TeamCategoryService } from './team-category.service';
import { TeamCategory } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTeamCategoryDto } from '@/dtos/TeamCategory.create.dto';
import { UpdateTeamCategoryDto } from '@/dtos/TeamCategory.update.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';

@ApiTags('فئات الفرق')
@Controller('team-categories')
export class TeamCategoryController extends BaseController<TeamCategory> {
    constructor(private readonly teamCategoryService: TeamCategoryService) {
        super(teamCategoryService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء فئة فريق جديدة', 'none', null, CreateTeamCategoryDto, 'فئات الفرق')
    create(@Body() createTeamCategoryDto: TeamCategory) {
        return this.teamCategoryService.create(createTeamCategoryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث فئة فريق محددة', 'none', UpdateTeamCategoryDto, null, 'فئات الفرق')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTeamCategoryDto: TeamCategory) {
        return this.teamCategoryService.update(id, updateTeamCategoryDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع فئات الفرق', 'none', null, null, 'فئات الفرق')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.teamCategoryService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فئة فريق محددة', 'none', null, null, 'فئات الفرق')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.teamCategoryService.findOne(id);
    }

    @Get('age-range/:minAge/:maxAge')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فئات الفرق ضمن نطاق عمر محدد', 'none', null, null, 'فئات الفرق')
    findByAgeRange(
        @Param('minAge') minAge: string,
        @Param('maxAge') maxAge: string,
    ) {
        return this.teamCategoryService.findByAgeRange(+minAge, +maxAge);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف فئة فريق محددة', 'none', null, null, 'فئات الفرق')
    remove(@Param('id') id: string) {
        return this.teamCategoryService.remove(+id);
    }
} 