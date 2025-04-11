import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductVariantService } from './product-variant.service';
import { CreateProductVariantDto } from '@/dtos/ProductVariant.create.dto';
import { UpdateProductVariantDto } from '@/dtos/ProductVariant.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { ProductVariant } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('متغيرات المنتجات')
@Controller('product-variant')
export class ProductVariantController extends BaseController<ProductVariant> {
    constructor(private readonly productVariantService: ProductVariantService) {
        super(productVariantService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة متغير منتج جديد', 'none', null, CreateProductVariantDto, 'متغيرات المنتجات')
    create(@Body() createProductVariantDto: CreateProductVariantDto) {
        return this.productVariantService.create(createProductVariantDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث متغير منتج معين', 'none', UpdateProductVariantDto, null, 'متغيرات المنتجات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.productVariantService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع متغيرات المنتجات', 'none', null, null, 'متغيرات المنتجات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProductVariant>> {
        return this.productVariantService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل متغير منتج معين', 'none', null, null, 'متغيرات المنتجات')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductVariant> {
        return this.productVariantService.getVariantProfile(+id);
    }

    @Get('product/:productId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع متغيرات منتج معين', 'none', null, null, 'متغيرات المنتجات')
    getProductVariants(@Param('productId') productId: number): Promise<ProductVariant[]> {
        return this.productVariantService.getProductVariants(+productId);
    }

    @Get('sku/:sku')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على متغير منتج برقم المنتج المميز', 'none', null, null, 'متغيرات المنتجات')
    getVariantBySku(@Param('sku') sku: string): Promise<ProductVariant> {
        return this.productVariantService.getVariantBySku(sku);
    }

    @Patch(':id/stock')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث المخزون لمتغير منتج معين', 'none', null, null, 'متغيرات المنتجات')
    updateStock(
        @Param('id') id: number,
        @Body('quantity') quantity: number,
    ) {
        return this.productVariantService.updateStock(+id, quantity);
    }

    @Patch(':id/price')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث السعر لمتغير منتج معين', 'none', null, null, 'متغيرات المنتجات')
    updatePrice(
        @Param('id') id: number,
        @Body('price') price: number,
    ) {
        return this.productVariantService.updatePrice(+id, price);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف متغير منتج معين', 'none', null, null, 'متغيرات المنتجات')
    remove(@Param('id') id: string) {
        return this.productVariantService.remove(+id);
    }
} 