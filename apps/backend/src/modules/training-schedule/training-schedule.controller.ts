import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrainingScheduleService } from './training-schedule.service';
import { TrainingSchedule } from '@shared/prisma';
import { BaseController } from '@/common/controllers/base.controller';


@ApiTags('جداول التدريب')
@Controller('training-schedules')
export class TrainingScheduleController extends BaseController<TrainingSchedule> {
    constructor(private readonly trainingScheduleService: TrainingScheduleService) {
        super(trainingScheduleService);
    }

    @Get('team/:teamId')
    @ApiOperation({ summary: 'الحصول على جداول تدريب فريق محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByTeam(@Param('teamId') teamId: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByTeam(+teamId);
    }

    @Get('coach/:coachId')
    @ApiOperation({ summary: 'الحصول على جداول تدريب مدرب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByCoach(@Param('coachId') coachId: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByCoach(+coachId);
    }

    @Get('facility/:facilityId')
    @ApiOperation({ summary: 'الحصول على جداول تدريب منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByFacility(@Param('facilityId') facilityId: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByFacility(+facilityId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على جداول تدريب بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByStatus(@Param('status') status: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByStatus(status);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جداول تدريب في نطاق تاريخ محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

} 