import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { MatchesService } from './matches.service';
import { Match } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@ApiTags('matches')
@Controller('matches')
export class MatchesController extends BaseController<Match> {
    constructor(private readonly matchesService: MatchesService) {
        super(matchesService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get match profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return match profile.' })
    async getMatchProfile(@Param('id', ParseIntPipe) id: number) {
        return this.matchesService.getMatchProfile(id);
    }

    @Get('team/:teamName')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get team matches' })
    @ApiResponse({ status: 200, description: 'Return team matches.' })
    async getTeamMatches(@Param('teamName') teamName: string) {
        return this.matchesService.getTeamMatches(teamName);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player matches' })
    @ApiResponse({ status: 200, description: 'Return player matches.' })
    async getPlayerMatches(@Param('playerId', ParseIntPipe) playerId: number) {
        return this.matchesService.getPlayerMatches(playerId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new match' })
    @ApiResponse({ status: 201, description: 'The match has been successfully created.' })
    async create(@Body() createMatchDto: CreateMatchDto) {
        return this.matchesService.create(createMatchDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a match' })
    @ApiResponse({ status: 200, description: 'The match has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMatchDto: UpdateMatchDto,
    ) {
        return this.matchesService.update(id, updateMatchDto);
    }
} 