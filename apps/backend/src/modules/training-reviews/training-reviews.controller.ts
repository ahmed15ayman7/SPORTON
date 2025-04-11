import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ParseIntPipe,
    Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TrainingReviewsService } from './training-reviews.service';
import { CreateTrainingReviewDto } from '@/dtos/TrainingReview.create.dto';
import { UpdateTrainingReviewDto } from '@/dtos/TrainingReview.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { TrainingReview } from '@shared/prisma';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('مراجعات التدريب')
@Controller('training-reviews')
export class TrainingReviewsController extends BaseController<TrainingReview> {
    constructor(private readonly trainingReviewsService: TrainingReviewsService) {
        super(trainingReviewsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة مراجعة جديدة للتدريب', 'none', CreateTrainingReviewDto, null, 'مراجعات التدريب')
    create(@Body() createTrainingReviewDto: CreateTrainingReviewDto): Promise<TrainingReview> {
        return this.trainingReviewsService.create(createTrainingReviewDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث مراجعة تدريب محددة', 'none', UpdateTrainingReviewDto, null, 'مراجعات التدريب')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.trainingReviewsService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع مراجعات التدريب', 'none', null, null, 'مراجعات التدريب')
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<TrainingReview>> {
        return this.trainingReviewsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل مراجعة محددة', 'none', null, null, 'مراجعات التدريب')
    getTrainingReviewProfile(@Param('id') id: string): Promise<TrainingReview> {
        return this.trainingReviewsService.getTrainingReviewProfile(+id);
    }

    @Get('training/:trainingId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مراجعات تدريب محدد', 'none', null, null, 'مراجعات التدريب')
    getTrainingReviews(@Param('trainingId') trainingId: string): Promise<TrainingReview[]> {
        return this.trainingReviewsService.getTrainingReviews(+trainingId);
    }

    @Get('user/:reviewerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مراجعات مستخدم محدد', 'none', null, null, 'مراجعات التدريب')
    getUserReviews(@Param('reviewerId') reviewerId: string): Promise<TrainingReview[]> {
        return this.trainingReviewsService.getUserReviews(+reviewerId);
    }

    @Get('training/:trainingId/average')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على متوسط تقييم تدريب محدد', 'none', null, null, 'مراجعات التدريب')
    getAverageRating(@Param('trainingId') trainingId: string): Promise<number> {
        return this.trainingReviewsService.getAverageRating(+trainingId);
    }

    @Get('training/:trainingId/distribution')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على توزيع تقييمات تدريب محدد', 'none', null, null, 'مراجعات التدريب')
    getRatingDistribution(@Param('trainingId') trainingId: string): Promise<{ rating: number; count: number }[]> {
        return this.trainingReviewsService.getRatingDistribution(+trainingId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف مراجعة محددة', 'none', null, null, 'مراجعات التدريب')
    remove(@Param('id') id: string) {
        return this.trainingReviewsService.remove(+id);
    }
} 