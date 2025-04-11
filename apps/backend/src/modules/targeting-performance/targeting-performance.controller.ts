import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TargetingPerformanceService } from './targeting-performance.service';
import { CreateTargetingPerformanceDto } from '@/dtos/TargetingPerformance.create.dto';
import { UpdateTargetingPerformanceDto } from '@/dtos/TargetingPerformance.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { TargetingPerformance } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('أداء الاستهداف')
@Controller('targeting-performance')
export class TargetingPerformanceController extends BaseController<TargetingPerformance> {
    constructor(private readonly targetingPerformanceService: TargetingPerformanceService) {
        super(targetingPerformanceService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة أداء استهداف جديد', 'none', null, CreateTargetingPerformanceDto, 'أداء الاستهداف')
    create(@Body() createTargetingPerformanceDto: CreateTargetingPerformanceDto) {
        return this.targetingPerformanceService.create(createTargetingPerformanceDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث أداء استهداف معين', 'none', UpdateTargetingPerformanceDto, null, 'أداء الاستهداف')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTargetingPerformanceDto: UpdateTargetingPerformanceDto) {
        return this.targetingPerformanceService.update(id, updateTargetingPerformanceDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع أداء الاستهداف', 'none', null, null, 'أداء الاستهداف')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.targetingPerformanceService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل أداء استهداف معين', 'none', null, null, 'أداء الاستهداف')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.targetingPerformanceService.getPerformanceProfile(id);
    }

    @Get('targeting/:targetingId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع أداء الاستهداف لاستهداف معين', 'none', null, null, 'أداء الاستهداف')
    getTargetingPerformance(@Param('targetingId', ParseIntPipe) targetingId: number) {
        return this.targetingPerformanceService.getTargetingPerformance(targetingId);
    }

    @Get('segment/:segmentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع أداء الاستهداف لفئة معينة', 'none', null, null, 'أداء الاستهداف')
    getSegmentPerformance(@Param('segmentId', ParseIntPipe) segmentId: number) {
        return this.targetingPerformanceService.getSegmentPerformance(segmentId);
    }

    @Get(':id/analytics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تحليلات أداء استهداف معين', 'none', null, null, 'أداء الاستهداف')
    getPerformanceAnalytics(@Param('id', ParseIntPipe) id: number) {
        return this.targetingPerformanceService.getPerformanceAnalytics(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف أداء استهداف معين', 'none', null, null, 'أداء الاستهداف')
    remove(@Param('id') id: string) {
        return this.targetingPerformanceService.remove(+id);
    }
} 