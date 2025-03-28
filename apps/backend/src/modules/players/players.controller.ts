import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { PlayersService } from './players.service';
import { Player } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@ApiTags('players')
@Controller('players')
export class PlayersController extends BaseController<Player> {
    constructor(private readonly playersService: PlayersService) {
        super(playersService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return player profile.' })
    async getPlayerProfile(@Param('id', ParseIntPipe) id: number) {
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

    @Get(':id/certificates')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player certificates' })
    @ApiResponse({ status: 200, description: 'Return player certificates.' })
    async getPlayerCertificates(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerCertificates(id);
    }

    @Get(':id/experiences')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player experiences' })
    @ApiResponse({ status: 200, description: 'Return player experiences.' })
    async getPlayerExperiences(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerExperiences(id);
    }

    @Get(':id/educations')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player educations' })
    @ApiResponse({ status: 200, description: 'Return player educations.' })
    async getPlayerEducations(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerEducations(id);
    }

    @Get(':id/skills')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player skills' })
    @ApiResponse({ status: 200, description: 'Return player skills.' })
    async getPlayerSkills(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerSkills(id);
    }

    @Get(':id/achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player achievements' })
    @ApiResponse({ status: 200, description: 'Return player achievements.' })
    async getPlayerAchievements(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerAchievements(id);
    }

    @Get(':id/endorsements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player endorsements' })
    @ApiResponse({ status: 200, description: 'Return player endorsements.' })
    async getPlayerEndorsements(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerEndorsements(id);
    }

    @Get(':id/availability')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player availability' })
    @ApiResponse({ status: 200, description: 'Return player availability.' })
    async getPlayerAvailability(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerAvailability(id);
    }

    @Get(':id/performance-reports')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player performance reports' })
    @ApiResponse({ status: 200, description: 'Return player performance reports.' })
    async getPlayerPerformanceReports(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerPerformanceReports(id);
    }

    @Get(':id/athlete-metrics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player athlete metrics' })
    @ApiResponse({ status: 200, description: 'Return player athlete metrics.' })
    async getPlayerAthleteMetrics(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerAthleteMetrics(id);
    }

    @Get(':id/professional-achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player professional achievements' })
    @ApiResponse({ status: 200, description: 'Return player professional achievements.' })
    async getPlayerProfessionalAchievements(@Param('id', ParseIntPipe) id: number) {
        return this.playersService.getPlayerProfessionalAchievements(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new player' })
    @ApiResponse({ status: 201, description: 'The player has been successfully created.' })
    async create(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playersService.create(createPlayerDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a player' })
    @ApiResponse({ status: 200, description: 'The player has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePlayerDto: UpdatePlayerDto,
    ) {
        return this.playersService.update(id, updatePlayerDto);
    }
} 