import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlayerStatisticsService } from './player-statistics.service';
import { CreatePlayerStatisticsDto } from './dto/create-player-statistics.dto';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto';

@ApiTags('إحصائيات اللاعبين')
@Controller('player-statistics')
export class PlayerStatisticsController {
    constructor(private readonly playerStatisticsService: PlayerStatisticsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إحصائيات لاعب جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء إحصائيات اللاعب بنجاح' })
    create(@Body() createPlayerStatisticsDto: CreatePlayerStatisticsDto) {
        return this.playerStatisticsService.create(createPlayerStatisticsDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع إحصائيات اللاعبين' })
    @ApiResponse({ status: 200, description: 'تم جلب إحصائيات اللاعبين بنجاح' })
    findAll() {
        return this.playerStatisticsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إحصائيات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إحصائيات اللاعب بنجاح' })
    findOne(@Param('id') id: string) {
        return this.playerStatisticsService.findOne(+id);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'الحصول على إحصائيات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إحصائيات اللاعب بنجاح' })
    findByPlayer(@Param('playerId') playerId: string) {
        return this.playerStatisticsService.findByPlayer(+playerId);
    }

    @Get('season/:season')
    @ApiOperation({ summary: 'الحصول على إحصائيات موسم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إحصائيات الموسم بنجاح' })
    findBySeason(@Param('season') season: string) {
        return this.playerStatisticsService.findBySeason(season);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إحصائيات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث إحصائيات اللاعب بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updatePlayerStatisticsDto: UpdatePlayerStatisticsDto,
    ) {
        return this.playerStatisticsService.update(+id, updatePlayerStatisticsDto);
    }

    @Patch(':id/update-stats')
    @ApiOperation({ summary: 'تحديث إحصائيات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث إحصائيات اللاعب بنجاح' })
    updateStats(
        @Param('id') id: string,
        @Body() stats: Partial<UpdatePlayerStatisticsDto>,
    ) {
        return this.playerStatisticsService.updateStats(+id, stats);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إحصائيات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف إحصائيات اللاعب بنجاح' })
    remove(@Param('id') id: string) {
        return this.playerStatisticsService.remove(+id);
    }
} 