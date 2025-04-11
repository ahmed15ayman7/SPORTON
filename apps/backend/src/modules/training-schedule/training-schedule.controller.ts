import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TrainingScheduleService } from './training-schedule.service';
import { TrainingSchedule } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { CreateTrainingScheduleDto } from '@/dtos/TrainingSchedule.create.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UpdateTrainingScheduleDto } from '@/dtos/TrainingSchedule.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('جداول التدريب')
@Controller('training-schedules')
export class TrainingScheduleController extends BaseController<TrainingSchedule> {
    constructor(private readonly trainingScheduleService: TrainingScheduleService) {
        super(trainingScheduleService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء جدول تدريب جديد', 'none', CreateTrainingScheduleDto, null, 'جداول التدريب')
    create(@Body() createTrainingScheduleDto: CreateTrainingScheduleDto) {
        return this.trainingScheduleService.create(createTrainingScheduleDto as TrainingSchedule);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث جدول تدريب محدد', 'none', UpdateTrainingScheduleDto, null, 'جداول التدريب')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.trainingScheduleService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع جداول التدريب', 'none', null, null, 'جداول التدريب')
    findAll(@Query() query: PaginationDto) {
        return this.trainingScheduleService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جدول تدريب محدد', 'none', null, null, 'جداول التدريب')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.trainingScheduleService.findOne(id);
    }

    @Get('team/:teamId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول تدريب فريق محدد', 'none', null, null, 'جداول التدريب')
    findByTeam(@Param('teamId') teamId: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByTeam(+teamId);
    }

    @Get('coach/:coachId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول تدريب مدرب محدد', 'none', null, null, 'جداول التدريب')
    findByCoach(@Param('coachId') coachId: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByCoach(+coachId);
    }

    @Get('facility/:facilityId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول تدريب منشأة محددة', 'none', null, null, 'جداول التدريب')
    findByFacility(@Param('facilityId') facilityId: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByFacility(+facilityId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول تدريب بحالة محددة', 'none', null, null, 'جداول التدريب')
    findByStatus(@Param('status') status: string): Promise<TrainingSchedule[]> {
        return this.trainingScheduleService.findByStatus(status);
    }

    @Get('date-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول تدريب في نطاق تاريخ محدد', 'none', null, null, 'جداول التدريب')
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