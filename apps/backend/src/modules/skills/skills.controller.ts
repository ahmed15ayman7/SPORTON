import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { SkillsService } from './skills.service';
import { Skill } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@ApiTags('skills')
@Controller('skills')
export class SkillsController extends BaseController<Skill> {
    constructor(private readonly skillsService: SkillsService) {
        super(skillsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get skill profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return skill profile.' })
    async getSkillProfile(@Param('id', ParseIntPipe) id: number) {
        return this.skillsService.getSkillProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user skills' })
    @ApiResponse({ status: 200, description: 'Return user skills.' })
    async getUserSkills(@Param('userId', ParseIntPipe) userId: number) {
        return this.skillsService.getUserSkills(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new skill' })
    @ApiResponse({ status: 201, description: 'The skill has been successfully created.' })
    async create(@Body() createSkillDto: CreateSkillDto) {
        return this.skillsService.create(createSkillDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a skill' })
    @ApiResponse({ status: 200, description: 'The skill has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSkillDto: UpdateSkillDto,
    ) {
        return this.skillsService.update(id, updateSkillDto);
    }
} 