import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { StatisticsService } from './statistics.service';
import { Statistic } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateStatisticDto } from '@/dtos/Statistic.create.dto';
import { UpdateStatisticDto } from '@/dtos/Statistic.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController extends BaseController<Statistic> {
    constructor(private readonly statisticsService: StatisticsService) {
        super(statisticsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء إحصاء جديد', 'none', null, CreateStatisticDto, 'الإحصاءات')
    create(@Body() createStatisticDto: CreateStatisticDto) {
        return this.statisticsService.create(createStatisticDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إحصاء محدد', 'none', UpdateStatisticDto, null, 'الإحصاءات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.statisticsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الإحصاءات', 'none', null, null, 'الإحصاءات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.statisticsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصاء محدد', 'none', null, null, 'الإحصاءات')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.statisticsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصاء معين بالتفاصيل', 'none', null, null, 'الإحصاءات')
    async getStatisticProfile(@Param('id', ParseIntPipe) id: number) {
        return this.statisticsService.getStatisticProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصاءات المستخدم', 'none', null, null, 'الإحصاءات')
    async getUserStatistic(@Param('userId', ParseIntPipe) userId: number) {
        return this.statisticsService.getUserStatistic(userId);
    }

    @Put('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إحصاءات المستخدم', 'none', UpdateStatisticDto, null, 'الإحصاءات')
    async updateUserStatistic(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() updateStatisticDto: UpdateStatisticDto,
    ) {
        return this.statisticsService.updateUserStatistic(userId, updateStatisticDto);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف إحصاء محدد', 'none', null, null, 'الإحصاءات')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.statisticsService.remove(id);
    }
} 