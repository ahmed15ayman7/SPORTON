import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { AgentsService } from './agents.service';
import { Agent, Player } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@ApiTags('agents')
@Controller('agents')
export class AgentsController extends BaseController<Agent> {
    constructor(private readonly agentsService: AgentsService) {
        super(agentsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get agent profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return agent profile.' })
    async getAgentProfile(@Param('id', ParseIntPipe) id: number) {
        return this.agentsService.getAgentProfile(id);
    }

    @Get(':id/players')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get agent players' })
    @ApiResponse({ status: 200, description: 'Return agent players.' })
    async getAgentPlayers(@Param('id', ParseIntPipe) id: number): Promise<Player[]> {
        return this.agentsService.getAgentPlayers(id);
    }

    @Get(':id/contracts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get agent contracts' })
    @ApiResponse({ status: 200, description: 'Return agent contracts.' })
    async getAgentContracts(@Param('id', ParseIntPipe) id: number) {
        return this.agentsService.getAgentContracts(id);
    }

    @Get(':id/transfers')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get agent transfers' })
    @ApiResponse({ status: 200, description: 'Return agent transfers.' })
    async getAgentTransfers(@Param('id', ParseIntPipe) id: number) {
        return this.agentsService.getAgentTransfers(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new agent' })
    @ApiResponse({ status: 201, description: 'The agent has been successfully created.' })
    async create(@Body() createAgentDto: CreateAgentDto) {
        return this.agentsService.create(createAgentDto);
    }


} 