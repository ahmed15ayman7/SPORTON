import { Controller, Get, Query, Param, Post, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { ScoutingReportService } from './scouting-report.service';
import { BaseController } from '../../common/controllers/base.controller';
import { ScoutingReport } from '@shared/prisma';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { CreateScoutingReportDto } from '@/dtos/ScoutingReport.create.dto';
import { UpdateScoutingReportDto } from '@/dtos/ScoutingReport.update.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('scouting-reports')
@Controller('scouting-reports')
export class ScoutingReportController extends BaseController<ScoutingReport> {
    constructor(private readonly scoutingReportService: ScoutingReportService) {
        super(scoutingReportService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء تقرير مرافقة جديد', 'none', null, CreateScoutingReportDto, 'التقارير المرافقة')
    async create(@Body() createScoutingReportDto: CreateScoutingReportDto): Promise<ScoutingReport> {
        return this.scoutingReportService.create(createScoutingReportDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تقرير مرافقة', 'none', UpdateScoutingReportDto, null, 'التقارير المرافقة')
    @ApiQuery({ type: UpdateScoutingReportDto })
    async update(@Param('id') id: number, @Body() data: any): Promise<ScoutingReport> {
        return this.scoutingReportService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التقارير المرافقة', 'none', null, null, 'التقارير المرافقة')
    @ApiQuery({ type: PaginationDto })
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ScoutingReport>> {
        return this.scoutingReportService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقرير مرافقة بالتفاصيل', 'none', null, null, 'التقارير المرافقة')
    async findOne(@Param('id') id: number): Promise<ScoutingReport> {
        return this.scoutingReportService.findOne(+id);
    }

    @Get('scout/:scoutId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقارير مرافقة بالتفاصيل', 'none', null, null, 'التقارير المرافقة')
    async findByScout(@Param('scoutId') scoutId: string): Promise<ScoutingReport[]> {
        return this.scoutingReportService.findByScout(+scoutId);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقارير مرافقة بالتفاصيل', 'none', null, null, 'التقارير المرافقة')
    async findByPlayer(@Param('playerId') playerId: string): Promise<ScoutingReport[]> {
        return this.scoutingReportService.findByPlayer(+playerId);
    }

    @Get('match/:matchId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقارير مرافقة بالتفاصيل', 'none', null, null, 'التقارير المرافقة')
    async findByMatch(@Param('matchId') matchId: string): Promise<ScoutingReport[]> {
        return this.scoutingReportService.findByMatch(+matchId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تقرير مرافقة', 'none', null, null, 'التقارير المرافقة')
    async remove(@Param('id') id: number): Promise<ScoutingReport> {
        return this.scoutingReportService.remove(+id);
    }
} 
