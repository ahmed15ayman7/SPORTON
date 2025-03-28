import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Sport } from '@prisma/client';

@ApiTags('المنتجات')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة منتج جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة المنتج بنجاح' })
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المنتجات' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.productService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل المنتج بنجاح' })
    findOne(@Param('id') id: string) {
        return this.productService.getProductProfile(+id);
    }

    @Get('category/:categoryId')
    @ApiOperation({ summary: 'الحصول على المنتجات حسب الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات حسب الفئة بنجاح' })
    getProductsByCategory(@Param('categoryId') categoryId: string) {
        return this.productService.getProductsByCategory(+categoryId);
    }

    @Get('sport/:sport')
    @ApiOperation({ summary: 'الحصول على المنتجات حسب الرياضة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات حسب الرياضة بنجاح' })
    getProductsBySport(@Param('sport') sport: Sport) {
        return this.productService.getProductsBySport(sport);
    }

    @Get('featured')
    @ApiOperation({ summary: 'الحصول على المنتجات المميزة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات المميزة بنجاح' })
    getFeaturedProducts() {
        return this.productService.getFeaturedProducts();
    }

    @Get('brand/:brand')
    @ApiOperation({ summary: 'الحصول على المنتجات حسب العلامة التجارية' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات حسب العلامة التجارية بنجاح' })
    getProductsByBrand(@Param('brand') brand: string) {
        return this.productService.getProductsByBrand(brand);
    }

    @Get('in-stock')
    @ApiOperation({ summary: 'الحصول على المنتجات المتوفرة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات المتوفرة بنجاح' })
    getProductsInStock() {
        return this.productService.getProductsInStock();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات المنتج بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productService.update(+id, updateProductDto);
    }

    @Patch(':id/stock')
    @ApiOperation({ summary: 'تحديث كمية المخزون لمنتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث كمية المخزون بنجاح' })
    updateStock(
        @Param('id') id: string,
        @Body('quantity') quantity: number,
    ) {
        return this.productService.updateStock(+id, quantity);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف منتج معين' })
    @ApiResponse({ status: 200, description: 'تم حذف المنتج بنجاح' })
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
} 