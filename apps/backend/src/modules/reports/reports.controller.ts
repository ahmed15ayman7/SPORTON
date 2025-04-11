import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { CreateReportDto } from '@/dtos/Report.create.dto';
import { UpdateReportDto } from '@/dtos/Report.update.dto';
import { Report } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('التقارير')
@Controller('reports')
export class ReportsController extends BaseController<Report> {
    constructor(private readonly reportsService: ReportsService) {
        super(reportsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة تقرير جديد', 'none', null, CreateReportDto, 'التقارير')
    create(@Body() createReportDto: CreateReportDto): Promise<Report> {
        return this.reportsService.create(createReportDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تقرير معين', 'none', UpdateReportDto, null, 'التقارير')
    update(@Param('id') id: number, @Body() data: any): Promise<Report> {
        return this.reportsService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التقارير', 'none', null, null, 'التقارير')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Report>> {
        return this.reportsService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل تقرير معين', 'none', null, null, 'التقارير')
    findOne(@Param('id') id: number): Promise<Report> {
        return this.reportsService.getReportProfile(+id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تقارير مستخدم معين', 'none', null, null, 'التقارير')
    getUserReports(@Param('userId') userId: number): Promise<Report[]> {
        return this.reportsService.getUserReports(+userId);
    }

    @Get('against/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التقارير ضد مستخدم معين', 'none', null, null, 'التقارير')
    getReportsAgainstUser(@Param('userId') userId: number): Promise<Report[]> {
        return this.reportsService.getReportsAgainstUser(+userId);
    }

    @Get('type/:type')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التقارير حسب النوع', 'none', null, null, 'التقارير')
    getReportsByType(@Param('type') type: string): Promise<Report[]> {
        return this.reportsService.getReportsByType(type);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التقارير حسب الحالة', 'none', null, null, 'التقارير')
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة تقرير معين', 'none', null, null, 'التقارير')
    updateStatus(@Param('id') id: number, @Body('status') status: string): Promise<Report> {
        return this.reportsService.updateReportStatus(+id, status);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تقرير معين', 'none', null, null, 'التقارير')
    remove(@Param('id') id: number): Promise<Report> {
        return this.reportsService.remove(+id);
    }
} 