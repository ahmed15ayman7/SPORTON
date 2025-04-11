import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from '@/dtos/ProductReview.create.dto';
import { UpdateProductReviewDto } from '@/dtos/ProductReview.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { ProductReview } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('تقييمات المنتجات')
@Controller('product-review')
export class ProductReviewController extends BaseController<ProductReview> {
    constructor(private readonly productReviewService: ProductReviewService) {
        super(productReviewService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة تقييم منتج جديد', 'none', null, CreateProductReviewDto, 'تقييمات المنتجات')
    create(@Body() createProductReviewDto: CreateProductReviewDto) {
        return this.productReviewService.create(createProductReviewDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تقييم منتج معين', 'none', UpdateProductReviewDto, null, 'تقييمات المنتجات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.productReviewService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تقييمات المنتجات', 'none', null, null, 'تقييمات المنتجات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ProductReview>> {
        return this.productReviewService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل تقييم منتج معين', 'none', null, null, 'تقييمات المنتجات')
    findOne(@Param('id') id: number): Promise<ProductReview> {
        return this.productReviewService.getReviewProfile(+id);
    }

    @Get('product/:productId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تقييمات منتج معين', 'none', null, null, 'تقييمات المنتجات')
    getProductReviews(@Param('productId') productId: number): Promise<ProductReview[]> {
        return this.productReviewService.getProductReviews(+productId);
    }

    @Get('product/:productId/rating')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على متوسط تقييم منتج معين', 'none', null, null, 'تقييمات المنتجات')
    getProductAverageRating(@Param('productId') productId: number): Promise<number> {
        return this.productReviewService.getProductAverageRating(+productId);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تقييمات مستخدم معين', 'none', null, null, 'تقييمات المنتجات')
    getUserReviews(@Param('userId') userId: number): Promise<ProductReview[]> {
        return this.productReviewService.getUserReviews(+userId);
    }

    @Patch(':id/verify')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تأكيد تقييم منتج معين', 'none', null, null, 'تقييمات المنتجات')
    verifyReview(@Param('id') id: number): Promise<ProductReview> {
        return this.productReviewService.verifyReview(+id);
    }

    @Patch(':id/images')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث صور تقييم منتج معين', 'none', null, null, 'تقييمات المنتجات')
    updateReviewImages(
        @Param('id') id: string,
        @Body('images') images: string[],
    ) {
        return this.productReviewService.updateReviewImages(+id, images);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تقييم منتج معين', 'none', null, null, 'تقييمات المنتجات')
    remove(@Param('id') id: string) {
        return this.productReviewService.remove(+id);
    }
} 