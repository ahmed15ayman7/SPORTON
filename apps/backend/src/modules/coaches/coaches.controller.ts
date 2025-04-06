import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { CoachesService } from './coaches.service';
import { Coach } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';

@ApiTags('coaches')
@Controller('coaches')
export class CoachesController extends BaseController<Coach> {
    constructor(private readonly coachesService: CoachesService) {
        super(coachesService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return coach profile.' })
    async getCoachProfile(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachProfile(id);
    }

    @Get(':id/trainings')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach trainings' })
    @ApiResponse({ status: 200, description: 'Return coach trainings.' })
    async getCoachTrainings(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachTrainings(id);
    }

    @Get(':id/achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach achievements' })
    @ApiResponse({ status: 200, description: 'Return coach achievements.' })
    async getCoachAchievements(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachAchievements(id);
    }

    @Get(':id/licenses')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach licenses' })
    @ApiResponse({ status: 200, description: 'Return coach licenses.' })
    async getCoachLicenses(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachLicenses(id);
    }

    @Get(':id/teams')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach teams' })
    @ApiResponse({ status: 200, description: 'Return coach teams.' })
    async getCoachTeams(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachTeams(id);
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new coach' })
    @ApiResponse({ status: 201, description: 'The coach has been successfully created.' })
    async create(@Body() createCoachDto: CreateCoachDto) {
        return this.coachesService.create(createCoachDto);
    }

} 