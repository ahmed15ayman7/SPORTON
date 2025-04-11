import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PerformanceReportsService } from './performance-reports.service';
import { CreatePerformanceReportDto } from '@/dtos/PerformanceReport.create.dto';
import { UpdatePerformanceReportDto } from '@/dtos/PerformanceReport.update.dto';
import { PerformanceReport } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('تقارير الأداء')
@Controller('performance-reports')
export class PerformanceReportsController extends BaseController<PerformanceReport> {
    constructor(private readonly performanceReportsService: PerformanceReportsService) {
        super(performanceReportsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة تقرير أداء جديد', 'none', null, CreatePerformanceReportDto, 'تقارير الأداء')
    create(@Body() createPerformanceReportDto: CreatePerformanceReportDto): Promise<PerformanceReport> {
        return this.performanceReportsService.create(createPerformanceReportDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تقرير أداء معين', 'none', UpdatePerformanceReportDto, null, 'تقارير الأداء')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<PerformanceReport> {
        return this.performanceReportsService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تقارير الأداء', 'none', null, null, 'تقارير الأداء')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<PerformanceReport>> {
        return this.performanceReportsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل تقرير أداء معين', 'none', null, null, 'تقارير الأداء')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<PerformanceReport> {
        return this.performanceReportsService.getPerformanceReportProfile(id);
    }

    @Get('athlete/:athleteId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تقارير أداء رياضي معين', 'none', null, null, 'تقارير الأداء')
    getAthleteReports(@Param('athleteId') athleteId: string): Promise<PerformanceReport[]> {
        return this.performanceReportsService.getAthleteReports(+athleteId);
    }

    @Get('coach/:coachId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تقارير أداء مدرب معين', 'none', null, null, 'تقارير الأداء')
    getCoachReports(@Param('coachId') coachId: string): Promise<PerformanceReport[]> {
        return this.performanceReportsService.getCoachReports(+coachId);
    }

    @Get('date-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقارير الأداء في نطاق تاريخ معين', 'none', null, null, 'تقارير الأداء')
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على أحدث تقرير أداء لرياضي معين', 'none', null, null, 'تقارير الأداء')
    getLatestReport(@Param('athleteId') athleteId: string): Promise<PerformanceReport | null> {
        return this.performanceReportsService.getLatestReport(+athleteId);
    }

    @Get('athlete/:athleteId/progress')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقدم رياضي معين', 'none', null, null, 'تقارير الأداء')
    getAthleteProgress(@Param('athleteId') athleteId: string): Promise<PerformanceReport[]> {
        return this.performanceReportsService.getAthleteProgress(+athleteId);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تقرير أداء معين', 'none', null, null, 'تقارير الأداء')
    remove(@Param('id') id: string): Promise<PerformanceReport> {
        return this.performanceReportsService.remove(+id);
    }
} 