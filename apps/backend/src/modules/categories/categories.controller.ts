import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { Category } from '@prisma/client';
@ApiTags('الفئات')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء فئة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الفئة بنجاح' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الفئات' })
    @ApiResponse({ status: 200, description: 'تم جلب الفئات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Category>> {
        return this.categoriesService.findAll(search);
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الفئة بنجاح' })
    getCategoryProfile(@Param('id') id: string) {
        return this.categoriesService.getCategoryProfile(+id);
    }

    @Get(':id/articles')
    @ApiOperation({ summary: 'الحصول على مقالات الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب مقالات الفئة بنجاح' })
    getCategoryArticles(@Param('id') id: string) {
        return this.categoriesService.getCategoryArticles(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث الفئة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الفئة بنجاح' })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف الفئة' })
    @ApiResponse({ status: 200, description: 'تم حذف الفئة بنجاح' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }
} 