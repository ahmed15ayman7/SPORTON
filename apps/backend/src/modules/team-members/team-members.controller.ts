import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { TeamMembersService } from './team-members.service';
import { TeamMember } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@ApiTags('team-members')
@Controller('team-members')
export class TeamMembersController extends BaseController<TeamMember> {
    constructor(private readonly teamMembersService: TeamMembersService) {
        super(teamMembersService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get team member profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return team member profile.' })
    async getTeamMemberProfile(@Param('id', ParseIntPipe) id: number) {
        return this.teamMembersService.getTeamMemberProfile(id);
    }

    @Get('team/:teamId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get team members' })
    @ApiResponse({ status: 200, description: 'Return team members.' })
    async getTeamMembers(@Param('teamId', ParseIntPipe) teamId: number) {
        return this.teamMembersService.getTeamMembers(teamId);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user team memberships' })
    @ApiResponse({ status: 200, description: 'Return user team memberships.' })
    async getUserTeamMemberships(@Param('userId', ParseIntPipe) userId: number) {
        return this.teamMembersService.getUserTeamMemberships(userId);
    }

    @Get('current/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user current team memberships' })
    @ApiResponse({ status: 200, description: 'Return user current team memberships.' })
    async getCurrentTeamMemberships(@Param('userId', ParseIntPipe) userId: number) {
        return this.teamMembersService.getCurrentTeamMemberships(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new team member' })
    @ApiResponse({ status: 201, description: 'The team member has been successfully created.' })
    async create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
        return this.teamMembersService.create(createTeamMemberDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a team member' })
    @ApiResponse({ status: 200, description: 'The team member has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTeamMemberDto: UpdateTeamMemberDto,
    ) {
        return this.teamMembersService.update(id, updateTeamMemberDto);
    }
} 