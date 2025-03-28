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
import { TrainingCategoriesService } from './training-categories.service';
import { CreateTrainingCategoryDto } from './dto/create-training-category.dto';
import { UpdateTrainingCategoryDto } from './dto/update-training-category.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('فئات التدريب')
@Controller('training-categories')
export class TrainingCategoriesController {
    constructor(private readonly trainingCategoriesService: TrainingCategoriesService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة فئة تدريب جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة الفئة بنجاح' })
    create(@Body() createTrainingCategoryDto: CreateTrainingCategoryDto) {
        return this.trainingCategoriesService.create(createTrainingCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع فئات التدريب' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الفئات بنجاح' })
    findAll(@Query() query: PaginationDto) {
        return this.trainingCategoriesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل فئة تدريب محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل الفئة بنجاح' })
    getTrainingCategoryProfile(@Param('id') id: string) {
        return this.trainingCategoriesService.getTrainingCategoryProfile(+id);
    }

    @Get(':id/trainings')
    @ApiOperation({ summary: 'الحصول على التدريبات في فئة محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع التدريبات بنجاح' })
    getCategoryTrainings(@Param('id') id: string) {
        return this.trainingCategoriesService.getCategoryTrainings(+id);
    }

    @Get(':id/stats')
    @ApiOperation({ summary: 'الحصول على إحصائيات فئة تدريب محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الإحصائيات بنجاح' })
    getCategoryStats(@Param('id') id: string) {
        return this.trainingCategoriesService.getCategoryStats(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث فئة تدريب محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الفئة بنجاح' })
    update(@Param('id') id: string, @Body() updateTrainingCategoryDto: UpdateTrainingCategoryDto) {
        return this.trainingCategoriesService.update(+id, updateTrainingCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف فئة تدريب محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف الفئة بنجاح' })
    remove(@Param('id') id: string) {
        return this.trainingCategoriesService.remove(+id);
    }
} 