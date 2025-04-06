import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OptimizationLogService } from './optimization-log.service';
import { CreateOptimizationLogDto } from './dto/create-optimization-log.dto';
import { UpdateOptimizationLogDto } from './dto/update-optimization-log.dto';
import { OptimizationLog } from '@shared/prisma';
import { BaseController } from '../../common/controllers/base.controller';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('سجلات التحسين')
@Controller('optimization-log')
export class OptimizationLogController extends BaseController<OptimizationLog> {
    constructor(private readonly optimizationLogService: OptimizationLogService) {
        super(optimizationLogService);
    }

    @Post()
    @ApiOperation({ summary: 'إضافة سجل تحسين جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة سجل التحسين بنجاح' })
    create(@Body() createOptimizationLogDto: CreateOptimizationLogDto): Promise<OptimizationLog> {
        return this.optimizationLogService.create(createOptimizationLogDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع سجلات التحسين' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التحسين بنجاح' })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<OptimizationLog>> {
        return this.optimizationLogService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل سجل تحسين معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل سجل التحسين بنجاح' })
    findOne(@Param('id') id: number): Promise<OptimizationLog> {
        return this.optimizationLogService.getLogProfile(id);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على سجلات التحسين حسب النوع' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التحسين حسب النوع بنجاح' })
    getLogsByType(@Param('type') type: string): Promise<OptimizationLog[]> {
        return this.optimizationLogService.getLogsByType(type);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على سجلات التحسين في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التحسين في النطاق الزمني بنجاح' })
    getLogsByDateRange(
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<OptimizationLog[]> {
        return this.optimizationLogService.getLogsByDateRange(startDate, endDate);
    }

} 