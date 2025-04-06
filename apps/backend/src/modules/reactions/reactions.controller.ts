import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { ReactionsService } from './reactions.service';
import { Reaction } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@ApiTags('reactions')
@Controller('reactions')
export class ReactionsController extends BaseController<Reaction> {
    constructor(private readonly reactionsService: ReactionsService) {
        super(reactionsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get reaction profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return reaction profile.' })
    async getReactionProfile(@Param('id', ParseIntPipe) id: number) {
        return this.reactionsService.getReactionProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user reactions' })
    @ApiResponse({ status: 200, description: 'Return user reactions.' })
    async getUserReactions(@Param('userId', ParseIntPipe) userId: number) {
        return this.reactionsService.getUserReactions(userId);
    }

    @Get('post/:postId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get post reactions' })
    @ApiResponse({ status: 200, description: 'Return post reactions.' })
    async getPostReactions(@Param('postId', ParseIntPipe) postId: number) {
        return this.reactionsService.getPostReactions(postId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new reaction' })
    @ApiResponse({ status: 201, description: 'The reaction has been successfully created.' })
    async create(@Body() createReactionDto: CreateReactionDto) {
        return this.reactionsService.create(createReactionDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a reaction' })
    @ApiResponse({ status: 200, description: 'The reaction has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateReactionDto: UpdateReactionDto,
    ) {
        return this.reactionsService.update(id, updateReactionDto);
    }
} 