import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { TeamsService } from './teams.service';
import { Team } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('teams')
@Controller('teams')
export class TeamsController extends BaseController<Team> {
    constructor(private readonly teamsService: TeamsService) {
        super(teamsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get team profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return team profile.' })
    async getTeamProfile(@Param('id', ParseIntPipe) id: number): Promise<Team> {
        return this.teamsService.getTeamProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user teams' })
    @ApiResponse({ status: 200, description: 'Return user teams.' })
    async getUserTeams(@Param('userId', ParseIntPipe) userId: number): Promise<Team[]> {
        return this.teamsService.getUserTeams(userId);
    }

    @Get('sport/:sport')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get teams by sport' })
    @ApiResponse({ status: 200, description: 'Return teams by sport.' })
    async getSportTeams(@Param('sport') sport: string): Promise<Team[]> {
        return this.teamsService.getSportTeams(sport);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new team' })
    @ApiResponse({ status: 201, description: 'The team has been successfully created.' })
    async create(@Body() createTeamDto: Team): Promise<Team> {
        return this.teamsService.create(createTeamDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a team' })
    @ApiResponse({ status: 200, description: 'The team has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTeamDto: Team,
    ): Promise<Team> {
        return this.teamsService.update(id, updateTeamDto);
    }
} 