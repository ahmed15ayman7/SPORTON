import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { FriendshipsService } from './friendships.service';
import { Friendship } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';

@ApiTags('friendships')
@Controller('friendships')
export class FriendshipsController extends BaseController<Friendship> {
    constructor(private readonly friendshipsService: FriendshipsService) {
        super(friendshipsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get friendship profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return friendship profile.' })
    async getFriendshipProfile(@Param('id', ParseIntPipe) id: number) {
        return this.friendshipsService.getFriendshipProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user friendships' })
    @ApiResponse({ status: 200, description: 'Return user friendships.' })
    async getUserFriendships(@Param('userId', ParseIntPipe) userId: number) {
        return this.friendshipsService.getUserFriendships(userId);
    }

    @Get('accepted/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user accepted friendships' })
    @ApiResponse({ status: 200, description: 'Return user accepted friendships.' })
    async getAcceptedFriendships(@Param('userId', ParseIntPipe) userId: number) {
        return this.friendshipsService.getAcceptedFriendships(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new friendship' })
    @ApiResponse({ status: 201, description: 'The friendship has been successfully created.' })
    async create(@Body() createFriendshipDto: CreateFriendshipDto) {
        return this.friendshipsService.create(createFriendshipDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a friendship' })
    @ApiResponse({ status: 200, description: 'The friendship has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateFriendshipDto: UpdateFriendshipDto,
    ) {
        return this.friendshipsService.update(id, updateFriendshipDto);
    }
} 