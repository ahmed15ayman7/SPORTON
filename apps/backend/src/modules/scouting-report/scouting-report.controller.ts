import { Controller, Get, Query, Param, Post, Put, Delete, Body } from '@nestjs/common';
import { ScoutingReportService } from './scouting-report.service';
import { BaseController } from '../../common/controllers/base.controller';
import { ScoutingReport } from '@shared/prisma';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { CreateScoutingReportDto } from './dto/create-scouting-report.dto';
import { UpdateScoutingReportDto } from './dto/update-scouting-report.dto';

@ApiTags('scouting-reports')
@Controller('scouting-reports')
export class ScoutingReportController extends BaseController<ScoutingReport> {
    constructor(private readonly scoutingReportService: ScoutingReportService) {
        super(scoutingReportService);
    }

    @Get()
    @ApiOperation({ summary: 'Get all scouting reports' })
    @ApiResponse({ status: 200, description: 'All scouting reports retrieved successfully' })
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ScoutingReport>> {
        return this.scoutingReportService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a scouting report by ID' })
    @ApiResponse({ status: 200, description: 'Scouting report retrieved successfully' })
    async findOne(@Param('id') id: number): Promise<ScoutingReport> {
        return this.scoutingReportService.findOne(+id);
    }

    @Get('scout/:scoutId')
    @ApiOperation({ summary: 'Get scouting reports by scout ID' })
    @ApiResponse({ status: 200, description: 'Scouting reports retrieved successfully' })
    async findByScout(@Param('scoutId') scoutId: string): Promise<ScoutingReport[]> {
        return this.scoutingReportService.findByScout(+scoutId);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'Get scouting reports by player ID' })
    @ApiResponse({ status: 200, description: 'Scouting reports retrieved successfully' })
    async findByPlayer(@Param('playerId') playerId: string): Promise<ScoutingReport[]> {
        return this.scoutingReportService.findByPlayer(+playerId);
    }

    @Get('match/:matchId')
    @ApiOperation({ summary: 'Get scouting reports by match ID' })
    @ApiResponse({ status: 200, description: 'Scouting reports retrieved successfully' })
    async findByMatch(@Param('matchId') matchId: string): Promise<ScoutingReport[]> {
        return this.scoutingReportService.findByMatch(+matchId);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new scouting report' })
    @ApiResponse({ status: 201, description: 'Scouting report created successfully' })
    async create(@Body() createScoutingReportDto: CreateScoutingReportDto): Promise<ScoutingReport> {
        return this.scoutingReportService.create(createScoutingReportDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a scouting report by ID' })
    @ApiResponse({ status: 200, description: 'Scouting report deleted successfully' })
    async remove(@Param('id') id: number): Promise<ScoutingReport> {
        return this.scoutingReportService.remove(+id);
    }
} 
