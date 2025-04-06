import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from '@shared/prisma';
import { BaseController } from '@/common/controllers/base.controller';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@ApiTags('فئات المنتجات')
@Controller('product-category')
export class ProductCategoryController extends BaseController<ProductCategory> {
    constructor(private readonly productCategoryService: ProductCategoryService) {
        super(productCategoryService);
    }

    @Post()
    @ApiOperation({ summary: 'إضافة فئة منتج جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة فئة المنتج بنجاح' })
    create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
        return this.productCategoryService.create(createProductCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع فئات المنتجات' })
    @ApiResponse({ status: 200, description: 'تم جلب فئات المنتجات بنجاح' })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProductCategory>> {
        return this.productCategoryService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل فئة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل فئة المنتج بنجاح' })
    findOne(@Param('id') id: number): Promise<ProductCategory> {
        return this.productCategoryService.getCategoryProfile(+id);
    }

    @Get('root')
    @ApiOperation({ summary: 'الحصول على الفئات الرئيسية' })
    @ApiResponse({ status: 200, description: 'تم جلب الفئات الرئيسية بنجاح' })
    getRootCategories(): Promise<ProductCategory[]> {
        return this.productCategoryService.getRootCategories();
    }

    @Get('parent/:parentId')
    @ApiOperation({ summary: 'الحصول على الفئات الفرعية لفئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الفئات الفرعية بنجاح' })
    getSubCategories(@Param('parentId') parentId: number): Promise<ProductCategory[]> {
        return this.productCategoryService.getSubCategories(+parentId);
    }

    @Get(':id/products')
    @ApiOperation({ summary: 'الحصول على فئة منتج مع منتجاتها' })
    @ApiResponse({ status: 200, description: 'تم جلب فئة المنتج مع منتجاتها بنجاح' })
    getCategoryWithProducts(@Param('id') id: number): Promise<ProductCategory> {
        return this.productCategoryService.getCategoryWithProducts(+id);
    }

    @Get(':id/hierarchy')
    @ApiOperation({ summary: 'الحصول على التسلسل الهرمي لفئة منتج معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب التسلسل الهرمي بنجاح' })
    getCategoryHierarchy(@Param('id') id: string): Promise<ProductCategory[]> {
        return this.productCategoryService.getCategoryHierarchy(+id);
    }
} 