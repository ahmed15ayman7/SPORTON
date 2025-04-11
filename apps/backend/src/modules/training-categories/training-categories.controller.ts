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
    Put,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TrainingCategoriesService } from './training-categories.service';
import { CreateTrainingCategoryDto } from '@/dtos/TrainingCategory.create.dto';
import { UpdateTrainingCategoryDto } from '@/dtos/TrainingCategory.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Training, TrainingCategory } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('فئات التدريب')
@Controller('training-categories')
export class TrainingCategoriesController extends BaseController<TrainingCategory> {
    constructor(private readonly trainingCategoriesService: TrainingCategoriesService) {
        super(trainingCategoriesService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة فئة تدريب جديدة', 'none', CreateTrainingCategoryDto, null, 'فئات التدريب')
    create(@Body() createTrainingCategoryDto: CreateTrainingCategoryDto) {
        return this.trainingCategoriesService.create(createTrainingCategoryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث فئة تدريب محددة', 'none', UpdateTrainingCategoryDto, null, 'فئات التدريب')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.trainingCategoriesService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع فئات التدريب', 'none', null, null, 'فئات التدريب')
    findAll(@Query() query: PaginationDto) {
        return this.trainingCategoriesService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل فئة تدريب محددة', 'none', null, null, 'فئات التدريب')
    getTrainingCategoryProfile(@Param('id') id: string) {
        return this.trainingCategoriesService.getTrainingCategoryProfile(+id);
    }

    @Get(':id/trainings')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على التدريبات في فئة محددة', 'none', null, null, 'فئات التدريب')
    getCategoryTrainings(@Param('id') id: string): Promise<Training[]> {
        return this.trainingCategoriesService.getCategoryTrainings(+id);
    }

    @Get(':id/stats')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصائيات فئة تدريب محددة', 'none', null, null, 'فئات التدريب')
    getCategoryStats(@Param('id') id: string) {
        return this.trainingCategoriesService.getCategoryStats(+id);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف فئة تدريب محددة', 'none', null, null, 'فئات التدريب')
    remove(@Param('id') id: string) {
        return this.trainingCategoriesService.remove(+id);
    }
} 