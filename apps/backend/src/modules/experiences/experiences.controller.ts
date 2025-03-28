import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { ExperiencesService } from './experiences.service';
import { Experience } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@ApiTags('experiences')
@Controller('experiences')
export class ExperiencesController extends BaseController<Experience> {
    constructor(private readonly experiencesService: ExperiencesService) {
        super(experiencesService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get experience profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return experience profile.' })
    async getExperienceProfile(@Param('id', ParseIntPipe) id: number) {
        return this.experiencesService.getExperienceProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user experiences' })
    @ApiResponse({ status: 200, description: 'Return user experiences.' })
    async getUserExperiences(@Param('userId', ParseIntPipe) userId: number) {
        return this.experiencesService.getUserExperiences(userId);
    }

    @Get('current/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user current experiences' })
    @ApiResponse({ status: 200, description: 'Return user current experiences.' })
    async getCurrentExperiences(@Param('userId', ParseIntPipe) userId: number) {
        return this.experiencesService.getCurrentExperiences(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new experience' })
    @ApiResponse({ status: 201, description: 'The experience has been successfully created.' })
    async create(@Body() createExperienceDto: CreateExperienceDto) {
        return this.experiencesService.create(createExperienceDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an experience' })
    @ApiResponse({ status: 200, description: 'The experience has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateExperienceDto: UpdateExperienceDto,
    ) {
        return this.experiencesService.update(id, updateExperienceDto);
    }
} 