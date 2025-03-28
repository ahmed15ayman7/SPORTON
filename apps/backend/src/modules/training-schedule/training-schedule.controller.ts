import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrainingScheduleService } from './training-schedule.service';
import { CreateTrainingScheduleDto } from './dto/create-training-schedule.dto';
import { UpdateTrainingScheduleDto } from './dto/update-training-schedule.dto';

@ApiTags('جداول التدريب')
@Controller('training-schedules')
export class TrainingScheduleController {
    constructor(private readonly trainingScheduleService: TrainingScheduleService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء جدول تدريب جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الجدول بنجاح' })
    create(@Body() createTrainingScheduleDto: CreateTrainingScheduleDto) {
        return this.trainingScheduleService.create(createTrainingScheduleDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع جداول التدريب' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findAll() {
        return this.trainingScheduleService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على جدول تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجدول بنجاح' })
    findOne(@Param('id') id: string) {
        return this.trainingScheduleService.findOne(+id);
    }

    @Get('team/:teamId')
    @ApiOperation({ summary: 'الحصول على جداول تدريب فريق محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByTeam(@Param('teamId') teamId: string) {
        return this.trainingScheduleService.findByTeam(+teamId);
    }

    @Get('coach/:coachId')
    @ApiOperation({ summary: 'الحصول على جداول تدريب مدرب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByCoach(@Param('coachId') coachId: string) {
        return this.trainingScheduleService.findByCoach(+coachId);
    }

    @Get('facility/:facilityId')
    @ApiOperation({ summary: 'الحصول على جداول تدريب منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByFacility(@Param('facilityId') facilityId: string) {
        return this.trainingScheduleService.findByFacility(+facilityId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على جداول تدريب بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByStatus(@Param('status') status: string) {
        return this.trainingScheduleService.findByStatus(status);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جداول تدريب في نطاق تاريخ محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.trainingScheduleService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث جدول تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث الجدول بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateTrainingScheduleDto: UpdateTrainingScheduleDto,
    ) {
        return this.trainingScheduleService.update(+id, updateTrainingScheduleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف جدول تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف الجدول بنجاح' })
    remove(@Param('id') id: string) {
        return this.trainingScheduleService.remove(+id);
    }
} 