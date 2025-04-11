import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from '@/dtos/ProductCategory.create.dto';
import { UpdateProductCategoryDto } from '@/dtos/ProductCategory.update.dto';
import { ProductCategory } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('فئات المنتجات')
@Controller('product-category')
export class ProductCategoryController extends BaseController<ProductCategory> {
    constructor(private readonly productCategoryService: ProductCategoryService) {
        super(productCategoryService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة فئة منتج جديدة', 'none', null, CreateProductCategoryDto, 'فئات المنتجات')
    create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.productCategoryService.create(createProductCategoryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث فئة منتج معينة', 'none', UpdateProductCategoryDto, null, 'فئات المنتجات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.productCategoryService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع فئات المنتجات', 'none', null, null, 'فئات المنتجات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProductCategory>> {
        return this.productCategoryService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل فئة منتج معينة', 'none', null, null, 'فئات المنتجات')
    findOne(@Param('id') id: number): Promise<ProductCategory> {
        return this.productCategoryService.getCategoryProfile(+id);
    }

    @Get('root')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الفئات الرئيسية', 'none', null, null, 'فئات المنتجات')
    getRootCategories(): Promise<ProductCategory[]> {
        return this.productCategoryService.getRootCategories();
    }

    @Get('parent/:parentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الفئات الفرعية لفئة معينة', 'none', null, null, 'فئات المنتجات')
    getSubCategories(@Param('parentId') parentId: number): Promise<ProductCategory[]> {
        return this.productCategoryService.getSubCategories(+parentId);
    }

    @Get(':id/products')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فئة منتج مع منتجاتها', 'none', null, null, 'فئات المنتجات')
    getCategoryWithProducts(@Param('id') id: number): Promise<ProductCategory> {
        return this.productCategoryService.getCategoryWithProducts(+id);
    }

    @Get(':id/hierarchy')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على التسلسل الهرمي لفئة منتج معينة', 'none', null, null, 'فئات المنتجات')
    getCategoryHierarchy(@Param('id') id: string): Promise<ProductCategory[]> {
        return this.productCategoryService.getCategoryHierarchy(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف فئة منتج معينة', 'none', null, null, 'فئات المنتجات')
    remove(@Param('id') id: string): Promise<ProductCategory> {
        return this.productCategoryService.remove(+id);
    }
} 