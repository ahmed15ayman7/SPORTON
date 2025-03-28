import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductVariantService } from './product-variant.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@ApiTags('متغيرات المنتجات')
@Controller('product-variant')
export class ProductVariantController {
    constructor(private readonly productVariantService: ProductVariantService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة متغير منتج جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة متغير المنتج بنجاح' })
    create(@Body() createProductVariantDto: CreateProductVariantDto) {
        return this.productVariantService.create(createProductVariantDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع متغيرات المنتجات' })
    @ApiResponse({ status: 200, description: 'تم جلب متغيرات المنتجات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.productVariantService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل متغير منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل متغير المنتج بنجاح' })
    findOne(@Param('id') id: string) {
        return this.productVariantService.getVariantProfile(+id);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'الحصول على جميع متغيرات منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب متغيرات المنتج بنجاح' })
    getProductVariants(@Param('productId') productId: string) {
        return this.productVariantService.getProductVariants(+productId);
    }

    @Get('sku/:sku')
    @ApiOperation({ summary: 'الحصول على متغير منتج برقم المنتج المميز' })
    @ApiResponse({ status: 200, description: 'تم جلب متغير المنتج بنجاح' })
    getVariantBySku(@Param('sku') sku: string) {
        return this.productVariantService.getVariantBySku(sku);
    }

    @Patch(':id/stock')
    @ApiOperation({ summary: 'تحديث المخزون لمتغير منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث المخزون بنجاح' })
    updateStock(
        @Param('id') id: string,
        @Body('quantity') quantity: number,
    ) {
        return this.productVariantService.updateStock(+id, quantity);
    }

    @Patch(':id/price')
    @ApiOperation({ summary: 'تحديث السعر لمتغير منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث السعر بنجاح' })
    updatePrice(
        @Param('id') id: string,
        @Body('price') price: number,
    ) {
        return this.productVariantService.updatePrice(+id, price);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات متغير منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات متغير المنتج بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateProductVariantDto: UpdateProductVariantDto,
    ) {
        return this.productVariantService.update(+id, updateProductVariantDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف متغير منتج معين' })
    @ApiResponse({ status: 200, description: 'تم حذف متغير المنتج بنجاح' })
    remove(@Param('id') id: string) {
        return this.productVariantService.remove(+id);
    }
} 