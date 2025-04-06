import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PerformanceReportsService } from './performance-reports.service';
import { CreatePerformanceReportDto } from './dto/create-performance-report.dto';
import { UpdatePerformanceReportDto } from './dto/update-performance-report.dto';
import { PerformanceReport } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('تقارير الأداء')
@Controller('performance-reports')
export class PerformanceReportsController {
    constructor(private readonly performanceReportsService: PerformanceReportsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة تقرير أداء جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة التقرير بنجاح' })
    create(@Body() createPerformanceReportDto: CreatePerformanceReportDto): Promise<PerformanceReport> {
        return this.performanceReportsService.create(createPerformanceReportDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع تقارير الأداء' })
    @ApiResponse({ status: 200, description: 'تم جلب تقارير الأداء بنجاح' })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<PerformanceReport>> {
        return this.performanceReportsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل تقرير أداء معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل التقرير بنجاح' })
    findOne(@Param('id') id: string): Promise<PerformanceReport> {
        return this.performanceReportsService.getPerformanceReportProfile(+id);
    }

    @Get('athlete/:athleteId')
    @ApiOperation({ summary: 'الحصول على جميع تقارير أداء رياضي معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تقارير الأداء بنجاح' })
    getAthleteReports(@Param('athleteId') athleteId: string): Promise<PerformanceReport[]> {
        return this.performanceReportsService.getAthleteReports(+athleteId);
    }

    @Get('coach/:coachId')
    @ApiOperation({ summary: 'الحصول على جميع تقارير أداء مدرب معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تقارير الأداء بنجاح' })
    getCoachReports(@Param('coachId') coachId: string): Promise<PerformanceReport[]> {
        return this.performanceReportsService.getCoachReports(+coachId);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على تقارير الأداء في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تقارير الأداء بنجاح' })
    getReportsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<PerformanceReport[]> {
        return this.performanceReportsService.getReportsByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('athlete/:athleteId/latest')
    @ApiOperation({ summary: 'الحصول على أحدث تقرير أداء لرياضي معين' })
    @ApiResponse({ status: 200, description: 'تم جلب أحدث تقرير بنجاح' })
    getLatestReport(@Param('athleteId') athleteId: string): Promise<PerformanceReport | null> {
        return this.performanceReportsService.getLatestReport(+athleteId);
    }

    @Get('athlete/:athleteId/progress')
    @ApiOperation({ summary: 'الحصول على تقدم رياضي معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تقدم الرياضي بنجاح' })
    getAthleteProgress(@Param('athleteId') athleteId: string): Promise<PerformanceReport[]> {
        return this.performanceReportsService.getAthleteProgress(+athleteId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات تقرير أداء معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات التقرير بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updatePerformanceReportDto: UpdatePerformanceReportDto,
    ): Promise<PerformanceReport> {
        return this.performanceReportsService.update(+id, updatePerformanceReportDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تقرير أداء معين' })
    @ApiResponse({ status: 200, description: 'تم حذف التقرير بنجاح' })
    remove(@Param('id') id: string): Promise<PerformanceReport> {
        return this.performanceReportsService.remove(+id);
    }
} 