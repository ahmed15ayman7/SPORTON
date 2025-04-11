import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../../dtos/Category.create.dto';
import { UpdateCategoryDto } from '../../dtos/Category.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { Category } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('الفئات')
@Controller('categories')
export class CategoriesController extends BaseController<Category> {
    constructor(private readonly categoriesService: CategoriesService) {
        super(categoriesService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCategoryDto, "الفئات")
    @ApiOperation({ summary: 'إنشاء فئة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الفئة بنجاح' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCategoryDto, null, "الفئات")
    update(@Param('id') id: number, @Body() data: any): Promise<Category> {
        return this.categoriesService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الفئات', 'none', null, null, "الفئات")
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Category>> {
        return this.categoriesService.findAll(search);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "الفئات")
    async findOne(@Param('id') id: number): Promise<Category> {
        return this.categoriesService.findOne(+id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تفاصيل الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الفئة بنجاح' })
    getCategoryProfile(@Param('id') id: string) {
        return this.categoriesService.getCategoryProfile(+id);
    }

    @Get(':id/articles')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على مقالات الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب مقالات الفئة بنجاح' })
    getCategoryArticles(@Param('id') id: string) {
        return this.categoriesService.getCategoryArticles(+id);
    }

} 