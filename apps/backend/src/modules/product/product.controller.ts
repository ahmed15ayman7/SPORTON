import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Sport, Product } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@ApiTags('المنتجات')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة منتج جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة المنتج بنجاح' })
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المنتجات' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات بنجاح' })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Product>> {
        return this.productService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل المنتج بنجاح' })
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.getProductProfile(+id);
    }

    @Get('category/:categoryId')
    @ApiOperation({ summary: 'الحصول على المنتجات حسب الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات حسب الفئة بنجاح' })
    getProductsByCategory(@Param('categoryId') categoryId: string): Promise<Product[]> {
        return this.productService.getProductsByCategory(+categoryId);
    }

    @Get('sport/:sport')
    @ApiOperation({ summary: 'الحصول على المنتجات حسب الرياضة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات حسب الرياضة بنجاح' })
    getProductsBySport(@Param('sport') sport: Sport): Promise<Product[]> {
        return this.productService.getProductsBySport(sport);
    }

    @Get('featured')
    @ApiOperation({ summary: 'الحصول على المنتجات المميزة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات المميزة بنجاح' })
    getFeaturedProducts(): Promise<Product[]> {
        return this.productService.getFeaturedProducts();
    }

    @Get('brand/:brand')
    @ApiOperation({ summary: 'الحصول على المنتجات حسب العلامة التجارية' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات حسب العلامة التجارية بنجاح' })
    getProductsByBrand(@Param('brand') brand: string): Promise<Product[]> {
        return this.productService.getProductsByBrand(brand);
    }

    @Get('in-stock')
    @ApiOperation({ summary: 'الحصول على المنتجات المتوفرة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنتجات المتوفرة بنجاح' })
    getProductsInStock(): Promise<Product[]> {
        return this.productService.getProductsInStock();
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات المنتج بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ): Promise<Product> {
        return this.productService.update(+id, updateProductDto);
    }

    @Patch(':id/stock')
    @ApiOperation({ summary: 'تحديث كمية المخزون لمنتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث كمية المخزون بنجاح' })
    updateStock(
        @Param('id') id: string,
        @Body('quantity') quantity: number,
    ): Promise<Product> {
        return this.productService.updateStock(+id, quantity);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف منتج معين' })
    @ApiResponse({ status: 200, description: 'تم حذف المنتج بنجاح' })
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
} 