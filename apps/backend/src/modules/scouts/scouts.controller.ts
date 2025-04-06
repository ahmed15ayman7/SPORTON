import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { ScoutsService } from './scouts.service';
import { Scout } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';


@ApiTags('scouts')
@Controller('scouts')
export class ScoutsController extends BaseController<Scout> {
    constructor(private readonly scoutsService: ScoutsService) {
        super(scoutsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get scout profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return scout profile.' })
    async getScoutProfile(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.getScoutProfile(id);
    }

    @Get(':id/reports')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get scout reports' })
    @ApiResponse({ status: 200, description: 'Return scout reports.' })
    async getScoutReports(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.getScoutReports(id);
    }

    @Get(':id/discoveries')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get scout discoveries' })
    @ApiResponse({ status: 200, description: 'Return scout discoveries.' })
    async getScoutDiscoveries(@Param('id', ParseIntPipe) id: number) {
        return this.scoutsService.getScoutDiscoveries(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new scout' })
    @ApiResponse({ status: 201, description: 'The scout has been successfully created.' })
    async create(@Body() createScoutDto: Scout) {
        return this.scoutsService.create(createScoutDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a scout' })
    @ApiResponse({ status: 200, description: 'The scout has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateScoutDto: Scout,
    ) {
        return this.scoutsService.update(id, updateScoutDto);
    }
} 