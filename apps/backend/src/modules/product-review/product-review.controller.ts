import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { ProductReview } from '@prisma/client';

@ApiTags('تقييمات المنتجات')
@Controller('product-review')
export class ProductReviewController {
    constructor(private readonly productReviewService: ProductReviewService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة تقييم منتج جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة تقييم المنتج بنجاح' })
    create(@Body() createProductReviewDto: CreateProductReviewDto) {
        return this.productReviewService.create(createProductReviewDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع تقييمات المنتجات' })
    @ApiResponse({ status: 200, description: 'تم جلب تقييمات المنتجات بنجاح' })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProductReview>> {
        return this.productReviewService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل تقييم منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل تقييم المنتج بنجاح' })
    findOne(@Param('id') id: number): Promise<ProductReview> {
        return this.productReviewService.getReviewProfile(+id);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'الحصول على جميع تقييمات منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تقييمات المنتج بنجاح' })
    getProductReviews(@Param('productId') productId: number): Promise<ProductReview[]> {
        return this.productReviewService.getProductReviews(+productId);
    }

    @Get('product/:productId/rating')
    @ApiOperation({ summary: 'الحصول على متوسط تقييم منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب متوسط تقييم المنتج بنجاح' })
    getProductAverageRating(@Param('productId') productId: number): Promise<number> {
        return this.productReviewService.getProductAverageRating(+productId);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على جميع تقييمات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تقييمات المستخدم بنجاح' })
    getUserReviews(@Param('userId') userId: number): Promise<ProductReview[]> {
        return this.productReviewService.getUserReviews(+userId);
    }

    @Patch(':id/verify')
    @ApiOperation({ summary: 'تأكيد تقييم منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تأكيد تقييم المنتج بنجاح' })
    verifyReview(@Param('id') id: number): Promise<ProductReview> {
        return this.productReviewService.verifyReview(+id);
    }

    @Patch(':id/images')
    @ApiOperation({ summary: 'تحديث صور تقييم منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث صور تقييم المنتج بنجاح' })
    updateReviewImages(
        @Param('id') id: string,
        @Body('images') images: string[],
    ) {
        return this.productReviewService.updateReviewImages(+id, images);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات تقييم منتج معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات تقييم المنتج بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateProductReviewDto: UpdateProductReviewDto,
    ) {
        return this.productReviewService.update(+id, updateProductReviewDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تقييم منتج معين' })
    @ApiResponse({ status: 200, description: 'تم حذف تقييم المنتج بنجاح' })
    remove(@Param('id') id: string) {
        return this.productReviewService.remove(+id);
    }
} 