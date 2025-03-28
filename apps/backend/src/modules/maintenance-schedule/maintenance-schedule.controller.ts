import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MaintenanceScheduleService } from './maintenance-schedule.service';
import { CreateMaintenanceScheduleDto } from './dto/create-maintenance-schedule.dto';
import { UpdateMaintenanceScheduleDto } from './dto/update-maintenance-schedule.dto';

@ApiTags('جداول الصيانة')
@Controller('maintenance-schedules')
export class MaintenanceScheduleController {
    constructor(private readonly maintenanceScheduleService: MaintenanceScheduleService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء جدول صيانة جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الجدول بنجاح' })
    create(@Body() createMaintenanceScheduleDto: CreateMaintenanceScheduleDto) {
        return this.maintenanceScheduleService.create(createMaintenanceScheduleDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع جداول الصيانة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findAll() {
        return this.maintenanceScheduleService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على جدول صيانة محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجدول بنجاح' })
    findOne(@Param('id') id: string) {
        return this.maintenanceScheduleService.findOne(+id);
    }

    @Get('facility/:facilityId')
    @ApiOperation({ summary: 'الحصول على جداول صيانة منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByFacility(@Param('facilityId') facilityId: string) {
        return this.maintenanceScheduleService.findByFacility(+facilityId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على جداول صيانة بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByStatus(@Param('status') status: string) {
        return this.maintenanceScheduleService.findByStatus(status);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جداول صيانة في نطاق تاريخ محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الجداول بنجاح' })
    findByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.maintenanceScheduleService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث جدول صيانة محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث الجدول بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateMaintenanceScheduleDto: UpdateMaintenanceScheduleDto,
    ) {
        return this.maintenanceScheduleService.update(+id, updateMaintenanceScheduleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف جدول صيانة محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف الجدول بنجاح' })
    remove(@Param('id') id: string) {
        return this.maintenanceScheduleService.remove(+id);
    }
} 