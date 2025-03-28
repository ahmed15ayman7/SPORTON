import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@ApiTags('فئات المنتجات')
@Controller('product-category')
export class ProductCategoryController {
    constructor(private readonly productCategoryService: ProductCategoryService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة فئة منتج جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة فئة المنتج بنجاح' })
    create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.productCategoryService.create(createProductCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع فئات المنتجات' })
    @ApiResponse({ status: 200, description: 'تم جلب فئات المنتجات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.productCategoryService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل فئة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل فئة المنتج بنجاح' })
    findOne(@Param('id') id: string) {
        return this.productCategoryService.getCategoryProfile(+id);
    }

    @Get('root')
    @ApiOperation({ summary: 'الحصول على الفئات الرئيسية' })
    @ApiResponse({ status: 200, description: 'تم جلب الفئات الرئيسية بنجاح' })
    getRootCategories() {
        return this.productCategoryService.getRootCategories();
    }

    @Get('parent/:parentId')
    @ApiOperation({ summary: 'الحصول على الفئات الفرعية لفئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الفئات الفرعية بنجاح' })
    getSubCategories(@Param('parentId') parentId: string) {
        return this.productCategoryService.getSubCategories(+parentId);
    }

    @Get(':id/products')
    @ApiOperation({ summary: 'الحصول على فئة منتج مع منتجاتها' })
    @ApiResponse({ status: 200, description: 'تم جلب فئة المنتج مع منتجاتها بنجاح' })
    getCategoryWithProducts(@Param('id') id: string) {
        return this.productCategoryService.getCategoryWithProducts(+id);
    }

    @Get(':id/hierarchy')
    @ApiOperation({ summary: 'الحصول على التسلسل الهرمي لفئة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب التسلسل الهرمي بنجاح' })
    getCategoryHierarchy(@Param('id') id: string) {
        return this.productCategoryService.getCategoryHierarchy(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات فئة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات فئة المنتج بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateProductCategoryDto: UpdateProductCategoryDto,
    ) {
        return this.productCategoryService.update(+id, updateProductCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف فئة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم حذف فئة المنتج بنجاح' })
    remove(@Param('id') id: string) {
        return this.productCategoryService.remove(+id);
    }
} 