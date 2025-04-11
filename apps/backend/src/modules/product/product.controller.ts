import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from '@/dtos/Product.create.dto';
import { UpdateProductDto } from '@/dtos/Product.update.dto';
import { Sport, Product } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('المنتجات')
@Controller('product')
export class ProductController extends BaseController<Product> {
    constructor(private readonly productService: ProductService) {
        super(productService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة منتج جديد', 'none', null, CreateProductDto, 'المنتجات')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث منتج معين', 'none', UpdateProductDto, null, 'المنتجات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Product> {
        return this.productService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المنتجات', 'none', null, null, 'المنتجات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Product>> {
        return this.productService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل منتج معين', 'none', null, null, 'المنتجات')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.getProductProfile(id);
    }

    @Get('category/:categoryId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المنتجات حسب الفئة', 'none', null, null, 'المنتجات')
    getProductsByCategory(@Param('categoryId') categoryId: string): Promise<Product[]> {
        return this.productService.getProductsByCategory(+categoryId);
    }

    @Get('sport/:sport')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المنتجات حسب الرياضة', 'none', null, null, 'المنتجات')
    getProductsBySport(@Param('sport') sport: Sport): Promise<Product[]> {
        return this.productService.getProductsBySport(sport);
    }

    @Get('featured')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المنتجات المميزة', 'none', null, null, 'المنتجات')
    getFeaturedProducts(): Promise<Product[]> {
        return this.productService.getFeaturedProducts();
    }

    @Get('brand/:brand')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المنتجات حسب العلامة التجارية', 'none', null, null, 'المنتجات')
    getProductsByBrand(@Param('brand') brand: string): Promise<Product[]> {
        return this.productService.getProductsByBrand(brand);
    }

    @Get('in-stock')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المنتجات المتوفرة', 'none', null, null, 'المنتجات')
    getProductsInStock(): Promise<Product[]> {
        return this.productService.getProductsInStock();
    }

    @Patch(':id/stock')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث كمية المخزون لمنتج معين', 'none', null, null, 'المنتجات')
    updateStock(
        @Param('id') id: string,
        @Body('quantity') quantity: number,
    ): Promise<Product> {
        return this.productService.updateStock(+id, quantity);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف منتج معين', 'none', null, null, 'المنتجات')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
} 