import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OptimizationLogService } from './optimization-log.service';
import { CreateOptimizationLogDto } from '@/dtos/OptimizationLog.create.dto';
import { UpdateOptimizationLogDto } from '@/dtos/OptimizationLog.update.dto';
import { OptimizationLog } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('سجلات التحسين')
@Controller('optimization-log')
export class OptimizationLogController extends BaseController<OptimizationLog> {
    constructor(private readonly optimizationLogService: OptimizationLogService) {
        super(optimizationLogService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة سجل تحسين جديد', 'create', CreateOptimizationLogDto, null, "سجلات التحسين")
    create(@Body() createOptimizationLogDto: CreateOptimizationLogDto): Promise<OptimizationLog> {
        return this.optimizationLogService.create(createOptimizationLogDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث سجل تحسين معين', 'update', UpdateOptimizationLogDto, null, "سجلات التحسين")
    update(@Param('id') id: number, @Body() data: any): Promise<OptimizationLog> {
        return this.optimizationLogService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع سجلات التحسين', 'none', null, null, "سجلات التحسين")
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<OptimizationLog>> {
        return this.optimizationLogService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل سجل تحسين معين', 'none', null, null, "سجلات التحسين")
    findOne(@Param('id') id: number): Promise<OptimizationLog> {
        return this.optimizationLogService.getLogProfile(id);
    }

    @Get('type/:type')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على سجلات التحسين حسب النوع', 'none', null, null, "سجلات التحسين")
    getLogsByType(@Param('type') type: string): Promise<OptimizationLog[]> {
        return this.optimizationLogService.getLogsByType(type);
    }

    @Get('date-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على سجلات التحسين في نطاق تاريخ معين', 'none', null, null, "سجلات التحسين")
    getLogsByDateRange(
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<OptimizationLog[]> {
        return this.optimizationLogService.getLogsByDateRange(startDate, endDate);
    }

} 