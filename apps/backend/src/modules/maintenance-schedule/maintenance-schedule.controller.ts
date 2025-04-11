import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MaintenanceScheduleService } from './maintenance-schedule.service';
import { CreateMaintenanceScheduleDto } from '@/dtos/MaintenanceSchedule.create.dto';
import { UpdateMaintenanceScheduleDto } from '@/dtos/MaintenanceSchedule.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { MaintenanceSchedule } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('جداول الصيانة')
@Controller('maintenance-schedules')
export class MaintenanceScheduleController extends BaseController<MaintenanceSchedule> {
    constructor(private readonly maintenanceScheduleService: MaintenanceScheduleService) {
        super(maintenanceScheduleService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء جدول صيانة جديد', 'create', CreateMaintenanceScheduleDto, null, "جداول الصيانة")
    create(@Body() createMaintenanceScheduleDto: CreateMaintenanceScheduleDto) {
        return this.maintenanceScheduleService.create(createMaintenanceScheduleDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث جدول صيانة محدد', 'update', UpdateMaintenanceScheduleDto, null, "جداول الصيانة")
    update(@Param('id') id: number, @Body() data: any) {
        return this.maintenanceScheduleService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع جداول الصيانة', 'none', null, null, "جداول الصيانة")
    findAll(@Query() paginationDto: PaginationDto) {
        return this.maintenanceScheduleService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جدول صيانة محدد', 'none', null, null, "جداول الصيانة")
    findOne(@Param('id') id: number) {
        return this.maintenanceScheduleService.findOne(+id);
    }

    @Get('facility/:facilityId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول صيانة منشأة محددة', 'none', null, null, "جداول الصيانة")
    findByFacility(@Param('facilityId') facilityId: string) {
        return this.maintenanceScheduleService.findByFacility(+facilityId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول صيانة بحالة محددة', 'none', null, null, "جداول الصيانة")
    findByStatus(@Param('status') status: string) {
        return this.maintenanceScheduleService.findByStatus(status);
    }

    @Get('date-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جداول صيانة في نطاق تاريخ محدد', 'none', null, null, "جداول الصيانة")
    findByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.maintenanceScheduleService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

} 