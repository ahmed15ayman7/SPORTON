import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';

@ApiTags('صور المنتجات')
@Controller('product-image')
export class ProductImageController {
    constructor(private readonly productImageService: ProductImageService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة صورة منتج جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة صورة المنتج بنجاح' })
    create(@Body() createProductImageDto: CreateProductImageDto) {
        return this.productImageService.create(createProductImageDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع صور المنتجات' })
    @ApiResponse({ status: 200, description: 'تم جلب صور المنتجات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.productImageService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل صورة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل صورة المنتج بنجاح' })
    findOne(@Param('id') id: string) {
        return this.productImageService.getImageProfile(+id);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'الحصول على جميع صور منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب صور المنتج بنجاح' })
    getProductImages(@Param('productId') productId: string) {
        return this.productImageService.getProductImages(+productId);
    }

    @Get('product/:productId/main')
    @ApiOperation({ summary: 'الحصول على الصورة الرئيسية لمنتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب الصورة الرئيسية بنجاح' })
    getMainProductImage(@Param('productId') productId: string) {
        return this.productImageService.getMainProductImage(+productId);
    }

    @Patch(':id/order')
    @ApiOperation({ summary: 'تحديث ترتيب صورة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث ترتيب الصورة بنجاح' })
    updateImageOrder(
        @Param('id') id: string,
        @Body('order') order: number,
    ) {
        return this.productImageService.updateImageOrder(+id, order);
    }

    @Patch(':id/main')
    @ApiOperation({ summary: 'تعيين صورة منتج معينة كصورة رئيسية' })
    @ApiResponse({ status: 200, description: 'تم تعيين الصورة كصورة رئيسية بنجاح' })
    setMainImage(@Param('id') id: string) {
        return this.productImageService.setMainImage(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات صورة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات صورة المنتج بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateProductImageDto: UpdateProductImageDto,
    ) {
        return this.productImageService.update(+id, updateProductImageDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف صورة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم حذف صورة المنتج بنجاح' })
    remove(@Param('id') id: string) {
        return this.productImageService.remove(+id);
    }
} 