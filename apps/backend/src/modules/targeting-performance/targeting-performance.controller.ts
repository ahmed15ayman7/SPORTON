import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TargetingPerformanceService } from './targeting-performance.service';
import { CreateTargetingPerformanceDto } from './dto/create-targeting-performance.dto';
import { UpdateTargetingPerformanceDto } from './dto/update-targeting-performance.dto';

@ApiTags('أداء الاستهداف')
@Controller('targeting-performance')
export class TargetingPerformanceController {
    constructor(private readonly targetingPerformanceService: TargetingPerformanceService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة أداء استهداف جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة أداء الاستهداف بنجاح' })
    create(@Body() createTargetingPerformanceDto: CreateTargetingPerformanceDto) {
        return this.targetingPerformanceService.create(createTargetingPerformanceDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع أداء الاستهداف' })
    @ApiResponse({ status: 200, description: 'تم جلب أداء الاستهداف بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.targetingPerformanceService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل أداء استهداف معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل أداء الاستهداف بنجاح' })
    findOne(@Param('id') id: string) {
        return this.targetingPerformanceService.getPerformanceProfile(+id);
    }

    @Get('targeting/:targetingId')
    @ApiOperation({ summary: 'الحصول على جميع أداء الاستهداف لاستهداف معين' })
    @ApiResponse({ status: 200, description: 'تم جلب أداء الاستهداف بنجاح' })
    getTargetingPerformance(@Param('targetingId') targetingId: string) {
        return this.targetingPerformanceService.getTargetingPerformance(+targetingId);
    }

    @Get('segment/:segmentId')
    @ApiOperation({ summary: 'الحصول على جميع أداء الاستهداف لفئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب أداء الاستهداف بنجاح' })
    getSegmentPerformance(@Param('segmentId') segmentId: string) {
        return this.targetingPerformanceService.getSegmentPerformance(+segmentId);
    }

    @Get(':id/analytics')
    @ApiOperation({ summary: 'الحصول على تحليلات أداء استهداف معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات أداء الاستهداف بنجاح' })
    getPerformanceAnalytics(@Param('id') id: string) {
        return this.targetingPerformanceService.getPerformanceAnalytics(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات أداء استهداف معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات أداء الاستهداف بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateTargetingPerformanceDto: UpdateTargetingPerformanceDto,
    ) {
        return this.targetingPerformanceService.update(+id, updateTargetingPerformanceDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف أداء استهداف معين' })
    @ApiResponse({ status: 200, description: 'تم حذف أداء الاستهداف بنجاح' })
    remove(@Param('id') id: string) {
        return this.targetingPerformanceService.remove(+id);
    }
} 