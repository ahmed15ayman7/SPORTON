import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrainingReviewsService } from './training-reviews.service';
import { CreateTrainingReviewDto } from './dto/create-training-review.dto';
import { UpdateTrainingReviewDto } from './dto/update-training-review.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('مراجعات التدريب')
@Controller('training-reviews')
export class TrainingReviewsController {
    constructor(private readonly trainingReviewsService: TrainingReviewsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة مراجعة جديدة للتدريب' })
    @ApiResponse({ status: 201, description: 'تم إضافة المراجعة بنجاح' })
    create(@Body() createTrainingReviewDto: CreateTrainingReviewDto) {
        return this.trainingReviewsService.create(createTrainingReviewDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع مراجعات التدريب' })
    @ApiResponse({ status: 200, description: 'تم استرجاع المراجعات بنجاح' })
    findAll(@Query() query: PaginationDto) {
        return this.trainingReviewsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل مراجعة محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل المراجعة بنجاح' })
    getTrainingReviewProfile(@Param('id') id: string) {
        return this.trainingReviewsService.getTrainingReviewProfile(+id);
    }

    @Get('training/:trainingId')
    @ApiOperation({ summary: 'الحصول على مراجعات تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع المراجعات بنجاح' })
    getTrainingReviews(@Param('trainingId') trainingId: string) {
        return this.trainingReviewsService.getTrainingReviews(+trainingId);
    }

    @Get('user/:reviewerId')
    @ApiOperation({ summary: 'الحصول على مراجعات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع المراجعات بنجاح' })
    getUserReviews(@Param('reviewerId') reviewerId: string) {
        return this.trainingReviewsService.getUserReviews(+reviewerId);
    }

    @Get('training/:trainingId/average')
    @ApiOperation({ summary: 'الحصول على متوسط تقييم تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع متوسط التقييم بنجاح' })
    getAverageRating(@Param('trainingId') trainingId: string) {
        return this.trainingReviewsService.getAverageRating(+trainingId);
    }

    @Get('training/:trainingId/distribution')
    @ApiOperation({ summary: 'الحصول على توزيع تقييمات تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع توزيع التقييمات بنجاح' })
    getRatingDistribution(@Param('trainingId') trainingId: string) {
        return this.trainingReviewsService.getRatingDistribution(+trainingId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث مراجعة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث المراجعة بنجاح' })
    update(@Param('id') id: string, @Body() updateTrainingReviewDto: UpdateTrainingReviewDto) {
        return this.trainingReviewsService.update(+id, updateTrainingReviewDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مراجعة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف المراجعة بنجاح' })
    remove(@Param('id') id: string) {
        return this.trainingReviewsService.remove(+id);
    }
} 