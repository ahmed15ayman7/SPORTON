import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { TrainingsService } from './trainings.service';
import { Training } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController extends BaseController<Training> {
    constructor(private readonly trainingsService: TrainingsService) {
        super(trainingsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get training profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return training profile.' })
    async getTrainingProfile(@Param('id', ParseIntPipe) id: number): Promise<Training> {
        return this.trainingsService.getTrainingProfile(id);
    }

    @Get('coach/:coachId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach trainings' })
    @ApiResponse({ status: 200, description: 'Return coach trainings.' })
    async getCoachTrainings(@Param('coachId', ParseIntPipe) coachId: number): Promise<Training[]> {
        return this.trainingsService.getCoachTrainings(coachId);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get player trainings' })
    @ApiResponse({ status: 200, description: 'Return player trainings.' })
    async getPlayerTrainings(@Param('playerId', ParseIntPipe) playerId: number): Promise<Training[]> {
        return this.trainingsService.getPlayerTrainings(playerId);
    }

    @Post(':trainingId/players/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add player to training' })
    @ApiResponse({ status: 200, description: 'Player has been added to training.' })
    async addPlayerToTraining(
        @Param('trainingId', ParseIntPipe) trainingId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
    ): Promise<Training> {
        return this.trainingsService.addPlayerToTraining(trainingId, playerId);
    }

    @Delete(':trainingId/players/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remove player from training' })
    @ApiResponse({ status: 200, description: 'Player has been removed from training.' })
    async removePlayerFromTraining(
        @Param('trainingId', ParseIntPipe) trainingId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
    ): Promise<Training> {
        return this.trainingsService.removePlayerFromTraining(trainingId, playerId);
    }

    @Get('check/:trainingId/players/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Check if player is in training' })
    @ApiResponse({ status: 200, description: 'Return whether player is in training.' })
    async isPlayerInTraining(
        @Param('trainingId', ParseIntPipe) trainingId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
    ) {
        return this.trainingsService.isPlayerInTraining(trainingId, playerId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new training' })
    @ApiResponse({ status: 201, description: 'The training has been successfully created.' })
    async create(@Body() createTrainingDto: CreateTrainingDto): Promise<Training> {
        return this.trainingsService.create(createTrainingDto);
    }
} 