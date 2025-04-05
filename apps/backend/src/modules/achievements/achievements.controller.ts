import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { AchievementsService } from './achievements.service';
import { Achievement } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@ApiTags('achievements')
@Controller('achievements')
export class AchievementsController extends BaseController<Achievement> {
    constructor(private readonly achievementsService: AchievementsService) {
        super(achievementsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get achievement profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return achievement profile.' })
    async getAchievementProfile(@Param('id', ParseIntPipe) id: number) {
        return this.achievementsService.getAchievementProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user achievements' })
    @ApiResponse({ status: 200, description: 'Return user achievements.' })
    async getUserAchievements(@Param('userId', ParseIntPipe) userId: number) {
        return this.achievementsService.getUserAchievements(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new achievement' })
    @ApiResponse({ status: 201, description: 'The achievement has been successfully created.' })
    async create(@Body() createAchievementDto: CreateAchievementDto) {
        return this.achievementsService.create(createAchievementDto);
    }
} 