import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OptimizationLogService } from './optimization-log.service';
import { CreateOptimizationLogDto } from './dto/create-optimization-log.dto';
import { UpdateOptimizationLogDto } from './dto/update-optimization-log.dto';

@ApiTags('سجلات التحسين')
@Controller('optimization-log')
export class OptimizationLogController {
    constructor(private readonly optimizationLogService: OptimizationLogService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة سجل تحسين جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة سجل التحسين بنجاح' })
    create(@Body() createOptimizationLogDto: CreateOptimizationLogDto) {
        return this.optimizationLogService.create(createOptimizationLogDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع سجلات التحسين' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التحسين بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.optimizationLogService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل سجل تحسين معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل سجل التحسين بنجاح' })
    findOne(@Param('id') id: string) {
        return this.optimizationLogService.getLogProfile(+id);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على سجلات التحسين حسب النوع' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التحسين حسب النوع بنجاح' })
    getLogsByType(@Param('type') type: string) {
        return this.optimizationLogService.getLogsByType(type);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على سجلات التحسين في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التحسين في النطاق الزمني بنجاح' })
    getLogsByDateRange(
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ) {
        return this.optimizationLogService.getLogsByDateRange(startDate, endDate);
    }

    @Get('impact/:impactType')
    @ApiOperation({ summary: 'الحصول على سجلات التحسين حسب نوع التأثير' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التحسين حسب نوع التأثير بنجاح' })
    getLogsByImpact(@Param('impactType') impactType: string) {
        return this.optimizationLogService.getLogsByImpact(impactType);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات سجل تحسين معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات سجل التحسين بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateOptimizationLogDto: UpdateOptimizationLogDto,
    ) {
        return this.optimizationLogService.update(+id, updateOptimizationLogDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف سجل تحسين معين' })
    @ApiResponse({ status: 200, description: 'تم حذف سجل التحسين بنجاح' })
    remove(@Param('id') id: string) {
        return this.optimizationLogService.remove(+id);
    }
} 