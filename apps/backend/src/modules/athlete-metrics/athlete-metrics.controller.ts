import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { AthleteMetricsService } from './athlete-metrics.service';
import { AthleteMetrics } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateAthleteMetricsDto } from '../../dtos/AthleteMetrics.create.dto';
import { UpdateAthleteMetricsDto } from '../../dtos/AthleteMetrics.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('athlete-metrics')
@Controller('athlete-metrics')
export class AthleteMetricsController extends BaseController<AthleteMetrics> {
    constructor(private readonly athleteMetricsService: AthleteMetricsService) {
        super(athleteMetricsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAthleteMetricsDto, "مقاييس الرياضي")
    async create(@Body() data: any): Promise<AthleteMetrics> {
        return this.athleteMetricsService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAthleteMetricsDto, null, "مقاييس الرياضي")
    async update(@Param('id') id: number, @Body() data: any): Promise<AthleteMetrics> {
        return this.athleteMetricsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "مقاييس الرياضي")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<AthleteMetrics>> {
        return this.athleteMetricsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "مقاييس الرياضي")
    async findOne(@Param('id') id: number): Promise<AthleteMetrics> {
        return this.athleteMetricsService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على ملف مقاييس الرياضي مع جميع العلاقات' })
    @ApiResponse({ status: 200, description: 'إرجاع ملف مقاييس الرياضي.' })
    async getAthleteMetricsProfile(@Param('id', ParseIntPipe) id: number) {
        return this.athleteMetricsService.getAthleteMetricsProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على مقاييس الرياضي' })
    @ApiResponse({ status: 200, description: 'إرجاع مقاييس الرياضي.' })
    async getUserAthleteMetrics(@Param('userId', ParseIntPipe) userId: number) {
        return this.athleteMetricsService.getUserAthleteMetrics(userId);
    }

    @Get('height-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على الرياضيين حسب نطاق الطول' })
    @ApiResponse({ status: 200, description: 'إرجاع قائمة الرياضيين حسب نطاق الطول.' })
    async getAthletesByHeightRange(
        @Query('minHeight', ParseIntPipe) minHeight: number,
        @Query('maxHeight', ParseIntPipe) maxHeight: number,
    ) {
        return this.athleteMetricsService.getAthletesByHeightRange(minHeight, maxHeight);
    }

    @Get('weight-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على الرياضيين حسب نطاق الوزن' })
    @ApiResponse({ status: 200, description: 'إرجاع قائمة الرياضيين حسب نطاق الوزن.' })
    async getAthletesByWeightRange(
        @Query('minWeight', ParseIntPipe) minWeight: number,
        @Query('maxWeight', ParseIntPipe) maxWeight: number,
    ) {
        return this.athleteMetricsService.getAthletesByWeightRange(minWeight, maxWeight);
    }


    @Put('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث مقاييس رياضي حسب معرف المستخدم' })
    @ApiResponse({ status: 200, description: 'تم تحديث مقاييس الرياضي بنجاح.' })
    async updateAthleteMetrics(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() updateAthleteMetricsDto: UpdateAthleteMetricsDto,
    ) {
        return this.athleteMetricsService.updateAthleteMetrics(userId, updateAthleteMetricsDto);
    }
} 