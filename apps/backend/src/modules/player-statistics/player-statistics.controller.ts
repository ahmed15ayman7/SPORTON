import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PlayerStatisticsService } from './player-statistics.service';
import { CreatePlayerStatisticsDto } from '@/dtos/PlayerStatistics.create.dto';
import { UpdatePlayerStatisticsDto } from '@/dtos/PlayerStatistics.update.dto';
import { PlayerStatistics } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('إحصائيات اللاعبين')
@Controller('player-statistics')
export class PlayerStatisticsController extends BaseController<PlayerStatistics> {
    constructor(private readonly playerStatisticsService: PlayerStatisticsService) {
        super(playerStatisticsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء إحصائيات لاعب جديدة', 'none', null, CreatePlayerStatisticsDto, 'إحصائيات اللاعبين')
    async create(@Body() createPlayerStatisticsDto: CreatePlayerStatisticsDto): Promise<PlayerStatistics> {
        return this.playerStatisticsService.create(createPlayerStatisticsDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إحصائيات لاعب محدد', 'none', UpdatePlayerStatisticsDto, null, 'إحصائيات اللاعبين')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<PlayerStatistics> {
        return this.playerStatisticsService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع إحصائيات اللاعبين', 'none', null, null, 'إحصائيات اللاعبين')
    @ApiQuery({ type: PaginationDto })
    async findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<PlayerStatistics>> {
        return this.playerStatisticsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصائيات لاعب محدد', 'none', null, null, 'إحصائيات اللاعبين')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<PlayerStatistics> {
        return this.playerStatisticsService.findOne(+id);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصائيات لاعب محدد', 'none', null, null, 'إحصائيات اللاعبين')
    async findByPlayer(@Param('playerId') playerId: string): Promise<PlayerStatistics[]> {
        return this.playerStatisticsService.findByPlayer(+playerId);
    }

    @Get('season/:season')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصائيات موسم محدد', 'none', null, null, 'إحصائيات اللاعبين')
    async findBySeason(@Param('season') season: string): Promise<PlayerStatistics[]> {
        return this.playerStatisticsService.findBySeason(season);
    }



    @Patch(':id/update-stats')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إحصائيات لاعب محدد', 'none', UpdatePlayerStatisticsDto, null, 'إحصائيات اللاعبين')
    async updateStats(
        @Param('id') id: string,
        @Body() stats: Partial<UpdatePlayerStatisticsDto>,
    ): Promise<PlayerStatistics> {
        return this.playerStatisticsService.updateStats(+id, stats);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف إحصائيات لاعب محدد', 'none', null, null, 'إحصائيات اللاعبين')
    remove(@Param('id') id: string) {
        return this.playerStatisticsService.remove(+id);
    }
} 