import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('التقييمات')
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء تقييم جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء التقييم بنجاح' })
    create(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.create(createReviewDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع التقييمات' })
    @ApiResponse({ status: 200, description: 'تم جلب التقييمات بنجاح' })
    findAll(@Query() params: PaginationDto) {
        return this.reviewService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تقييم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب التقييم بنجاح' })
    findOne(@Param('id') id: string) {
        return this.reviewService.findOne(+id);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'الحصول على تقييمات منتج محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب تقييمات المنتج بنجاح' })
    findByProduct(@Param('productId') productId: string) {
        return this.reviewService.findByProduct(+productId);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على تقييمات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب تقييمات المستخدم بنجاح' })
    findByUser(@Param('userId') userId: string) {
        return this.reviewService.findByUser(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث تقييم محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث التقييم بنجاح' })
    update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
        return this.reviewService.update(+id, updateReviewDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تقييم محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف التقييم بنجاح' })
    remove(@Param('id') id: string) {
        return this.reviewService.remove(+id);
    }
} 