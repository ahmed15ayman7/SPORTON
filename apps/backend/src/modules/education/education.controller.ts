import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { EducationService } from './education.service';
import { Education } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@ApiTags('education')
@Controller('education')
export class EducationController extends BaseController<Education> {
    constructor(private readonly educationService: EducationService) {
        super(educationService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get education profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return education profile.' })
    async getEducationProfile(@Param('id', ParseIntPipe) id: number) {
        return this.educationService.getEducationProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user education' })
    @ApiResponse({ status: 200, description: 'Return user education.' })
    async getUserEducation(@Param('userId', ParseIntPipe) userId: number) {
        return this.educationService.getUserEducation(userId);
    }

    @Get('latest/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user latest education' })
    @ApiResponse({ status: 200, description: 'Return user latest education.' })
    async getLatestEducation(@Param('userId', ParseIntPipe) userId: number) {
        return this.educationService.getLatestEducation(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new education' })
    @ApiResponse({ status: 201, description: 'The education has been successfully created.' })
    async create(@Body() createEducationDto: CreateEducationDto) {
        return this.educationService.create(createEducationDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an education' })
    @ApiResponse({ status: 200, description: 'The education has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEducationDto: UpdateEducationDto,
    ) {
        return this.educationService.update(id, updateEducationDto);
    }
} 