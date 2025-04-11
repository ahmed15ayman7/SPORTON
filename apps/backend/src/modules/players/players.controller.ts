import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { PlayersService } from './players.service';
import { Player, ScoutingReport, Achievement, AgentClient, Contract, Transfer } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreatePlayerDto } from '@/dtos/Player.create.dto';
import { UpdatePlayerDto } from '@/dtos/Player.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@ApiTags('players')
@Controller('players')
export class PlayersController extends BaseController<Player> {
    constructor(private readonly playersService: PlayersService) {
        super(playersService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة لاعب جديد', 'none', null, CreatePlayerDto, 'اللاعبين')
    create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return this.playersService.create(createPlayerDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث لاعب معين', 'none', UpdatePlayerDto, null, 'اللاعبين')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Player> {
        return this.playersService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع اللاعبين', 'none', null, null, 'اللاعبين')
    @ApiQuery({ type: PaginationDto })
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Player>> {
        return this.playersService.findAll(params);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الملف الشخصي لللاعب بجميع العلاقات', 'none', null, null, 'اللاعبين')
    async getPlayerProfile(@Param('id', ParseIntPipe) id: number): Promise<Player> {
        return this.playersService.getPlayerProfile(id);
    }

    @Get(':id/statistics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصائيات اللاعب', 'none', null, null, 'اللاعبين')
    async getPlayerStatistics(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerStatistics(id);
    }

    @Get(':id/injuries')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إصابات اللاعب', 'none', null, null, 'اللاعبين')
    async getPlayerInjuries(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerInjuries(id);
    }

    @Get(':id/agent-clients')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عملاء الوكيل لللاعب', 'none', null, null, 'اللاعبين')
    async getPlayerAgentClient(@Param('id', ParseIntPipe) id: number): Promise<AgentClient[]> {
        return this.playersService.getPlayerAgentClient(id);
    }

    @Get(':id/contracts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عقود اللاعب', 'none', null, null, 'اللاعبين')
    async getPlayerContracts(@Param('id', ParseIntPipe) id: number): Promise<Contract[]> {
        return this.playersService.getPlayerContracts(id);
    }

    @Get(':id/transfers')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على التحويلات اللاعب', 'none', null, null, 'اللاعبين')
    async getPlayerTransfers(@Param('id', ParseIntPipe) id: number): Promise<Transfer[]> {
        return this.playersService.getPlayerTransfers(id);
    }

    @Get(':id/scouting-reports')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تقارير الكشف عن اللاعب', 'none', null, null, 'اللاعبين')
    async getPlayerScoutingReports(@Param('id', ParseIntPipe) id: number): Promise<ScoutingReport[]> {
        return this.playersService.getPlayerScoutingReports(id);
    }

    @Get(':id/achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المؤنثات اللاعب', 'none', null, null, 'اللاعبين')
    async getPlayerAchievements(@Param('id', ParseIntPipe) id: number): Promise<Achievement[]> {
        return this.playersService.getPlayerAchievements(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف لاعب معين', 'none', null, null, 'اللاعبين')
    remove(@Param('id', ParseIntPipe) id: number): Promise<Player> {
        return this.playersService.remove(id);
    }
} 