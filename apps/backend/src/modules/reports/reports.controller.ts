import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('التقارير')
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة تقرير جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة التقرير بنجاح' })
    create(@Body() createReportDto: CreateReportDto): Promise<Report> {
        return this.reportsService.create(createReportDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع التقارير' })
    @ApiResponse({ status: 200, description: 'تم جلب التقارير بنجاح' })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Report>> {
        return this.reportsService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل تقرير معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل التقرير بنجاح' })
    findOne(@Param('id') id: number): Promise<Report> {
        return this.reportsService.getReportProfile(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على جميع تقارير مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تقارير المستخدم بنجاح' })
    getUserReports(@Param('userId') userId: number): Promise<Report[]> {
        return this.reportsService.getUserReports(+userId);
    }

    @Get('against/:userId')
    @ApiOperation({ summary: 'الحصول على جميع التقارير ضد مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب التقارير بنجاح' })
    getReportsAgainstUser(@Param('userId') userId: number): Promise<Report[]> {
        return this.reportsService.getReportsAgainstUser(+userId);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على جميع التقارير حسب النوع' })
    @ApiResponse({ status: 200, description: 'تم جلب التقارير بنجاح' })
    getReportsByType(@Param('type') type: string): Promise<Report[]> {
        return this.reportsService.getReportsByType(type);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على جميع التقارير حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب التقارير بنجاح' })
    getReportsByStatus(@Param('status') status: string): Promise<Report[]> {
        return this.reportsService.getReportsByStatus(status);
    }

    // @Get('statistics')
    // @ApiOperation({ summary: 'الحصول على إحصائيات التقارير' })
    // @ApiResponse({ status: 200, description: 'تم جلب إحصائيات التقارير بنجاح' })
    // getReportStatistics(): Promise<ReportStatistics> {
    //     return this.reportsService.getReportStatistics();
    // }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة تقرير معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة التقرير بنجاح' })
    updateStatus(@Param('id') id: number, @Body('status') status: string): Promise<Report> {
        return this.reportsService.updateReportStatus(+id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات تقرير معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات التقرير بنجاح' })
    update(
        @Param('id') id: number,
        @Body() updateReportDto: UpdateReportDto,
    ): Promise<Report> {
        return this.reportsService.update(+id, updateReportDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تقرير معين' })
    @ApiResponse({ status: 200, description: 'تم حذف التقرير بنجاح' })
    remove(@Param('id') id: number): Promise<Report> {
        return this.reportsService.remove(+id);
    }
} 