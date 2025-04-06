import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { PlayersService } from './players.service';
import { Player, ScoutingReport, Achievement, AgentClient, Contract, Transfer } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@ApiTags('players')
@Controller('players')
export class PlayersController extends BaseController<Player> {
    constructor(private readonly playersService: PlayersService) {
        super(playersService);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all players' })
    @ApiResponse({ status: 200, description: 'Return all players.' })
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Player>> {
        return this.playersService.findAll(params);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return player profile.' })
    async getPlayerProfile(@Param('id', ParseIntPipe) id: number): Promise<Player> {
        return this.playersService.getPlayerProfile(id);
    }

    @Get(':id/statistics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player statistics' })
    @ApiResponse({ status: 200, description: 'Return player statistics.' })
    async getPlayerStatistics(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerStatistics(id);
    }

    @Get(':id/injuries')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player injuries' })
    @ApiResponse({ status: 200, description: 'Return player injuries.' })
    async getPlayerInjuries(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerInjuries(id);
    }

    @Get(':id/agent-clients')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player agent clients' })
    @ApiResponse({ status: 200, description: 'Return player agent clients.' })
    async getPlayerAgentClient(@Param('id', ParseIntPipe) id: number): Promise<AgentClient[]> {
        return this.playersService.getPlayerAgentClient(id);
    }

    @Get(':id/contracts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player contracts' })
    @ApiResponse({ status: 200, description: 'Return player contracts.' })
    async getPlayerContracts(@Param('id', ParseIntPipe) id: number): Promise<Contract[]> {
        return this.playersService.getPlayerContracts(id);
    }

    @Get(':id/transfers')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player transfers' })
    @ApiResponse({ status: 200, description: 'Return player transfers.' })
    async getPlayerTransfers(@Param('id', ParseIntPipe) id: number): Promise<Transfer[]> {
        return this.playersService.getPlayerTransfers(id);
    }

    @Get(':id/scouting-reports')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player scouting reports' })
    @ApiResponse({ status: 200, description: 'Return player scouting reports.' })
    async getPlayerScoutingReports(@Param('id', ParseIntPipe) id: number): Promise<ScoutingReport[]> {
        return this.playersService.getPlayerScoutingReports(id);
    }

    @Get(':id/achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player achievements' })
    @ApiResponse({ status: 200, description: 'Return player achievements.' })
    async getPlayerAchievements(@Param('id', ParseIntPipe) id: number): Promise<Achievement[]> {
        return this.playersService.getPlayerAchievements(id);
    }



    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new player' })
    @ApiResponse({ status: 201, description: 'The player has been successfully created.' })
    async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return this.playersService.create(createPlayerDto);
    }

} 