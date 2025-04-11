import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductImageService } from './product-image.service';
import { CreateProductImageDto } from '@/dtos/ProductImage.create.dto';
import { UpdateProductImageDto } from '@/dtos/ProductImage.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { ProductImage } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('صور المنتجات')
@Controller('product-image')
export class ProductImageController extends BaseController<ProductImage> {
    constructor(private readonly productImageService: ProductImageService) {
        super(productImageService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة صورة منتج جديدة', 'none', null, CreateProductImageDto, 'صور المنتجات')
    create(@Body() createProductImageDto: CreateProductImageDto) {
        return this.productImageService.create(createProductImageDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث صورة منتج معينة', 'none', UpdateProductImageDto, null, 'صور المنتجات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.productImageService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع صور المنتجات', 'none', null, null, 'صور المنتجات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProductImage>> {
        return this.productImageService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل صورة منتج معينة', 'none', null, null, 'صور المنتجات')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productImageService.getImageProfile(id);
    }

    @Get('product/:productId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع صور منتج معين', 'none', null, null, 'صور المنتجات')
    getProductImages(@Param('productId') productId: string) {
        return this.productImageService.getProductImages(+productId);
    }

    @Get('product/:productId/main')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الصورة الرئيسية لمنتج معين', 'none', null, null, 'صور المنتجات')
    getMainProductImage(@Param('productId') productId: string) {
        return this.productImageService.getMainProductImage(+productId);
    }

    @Patch(':id/order')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث ترتيب صورة منتج معينة', 'none', null, null, 'صور المنتجات')
    updateImageOrder(
        @Param('id') id: string,
        @Body('order') order: number,
    ) {
        return this.productImageService.updateImageOrder(+id, order);
    }

    @Patch(':id/main')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تعيين صورة منتج معينة كصورة رئيسية', 'none', null, null, 'صور المنتجات')
    setMainImage(@Param('id') id: string) {
        return this.productImageService.setMainImage(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف صورة منتج معينة', 'none', null, null, 'صور المنتجات')
    remove(@Param('id') id: string) {
        return this.productImageService.remove(+id);
    }
} 