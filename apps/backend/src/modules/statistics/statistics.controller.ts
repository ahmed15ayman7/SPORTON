import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { StatisticsService } from './statistics.service';
import { Statistic } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController extends BaseController<Statistic> {
    constructor(private readonly statisticsService: StatisticsService) {
        super(statisticsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get statistic profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return statistic profile.' })
    async getStatisticProfile(@Param('id', ParseIntPipe) id: number) {
        return this.statisticsService.getStatisticProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user statistics' })
    @ApiResponse({ status: 200, description: 'Return user statistics.' })
    async getUserStatistic(@Param('userId', ParseIntPipe) userId: number) {
        return this.statisticsService.getUserStatistic(userId);
    }

    @Put('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user statistics' })
    @ApiResponse({ status: 200, description: 'User statistics have been successfully updated.' })
    async updateUserStatistic(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() updateStatisticDto: UpdateStatisticDto,
    ) {
        return this.statisticsService.updateUserStatistic(userId, updateStatisticDto);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new statistic' })
    @ApiResponse({ status: 201, description: 'The statistic has been successfully created.' })
    async create(@Body() createStatisticDto: CreateStatisticDto) {
        return this.statisticsService.create(createStatisticDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a statistic' })
    @ApiResponse({ status: 200, description: 'The statistic has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStatisticDto: UpdateStatisticDto,
    ) {
        return this.statisticsService.update(id, updateStatisticDto);
    }
} 