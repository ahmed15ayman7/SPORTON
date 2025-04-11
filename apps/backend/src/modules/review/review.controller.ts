import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from '@/dtos/Review.create.dto';
import { UpdateReviewDto } from '@/dtos/Review.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Review } from '@shared/prisma';

@ApiTags('التقييمات')
@Controller('reviews')
export class ReviewController extends BaseController<Review> {
    constructor(private readonly reviewService: ReviewService) {
        super(reviewService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء تقييم جديد', 'none', null, CreateReviewDto, 'التقييمات')
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.create(createReviewDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تقييم محدد', 'none', UpdateReviewDto, null, 'التقييمات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.reviewService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التقييمات', 'none', null, null, 'التقييمات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.reviewService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقييم محدد', 'none', null, null, 'التقييمات')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reviewService.findOne(+id);
    }

    @Get('product/:productId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقييمات منتج محدد', 'none', null, null, 'التقييمات')
    findByProduct(@Param('productId') productId: string) {
        return this.reviewService.findByProduct(+productId);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقييمات مستخدم محدد', 'none', null, null, 'التقييمات')
    findByUser(@Param('userId') userId: string) {
        return this.reviewService.findByUser(+userId);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تقييم محدد', 'none', null, null, 'التقييمات')
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
} 