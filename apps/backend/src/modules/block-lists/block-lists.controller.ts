import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { BlockListsService } from './block-lists.service';
import { BlockList } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateBlockListDto } from './dto/create-block-list.dto';
import { UpdateBlockListDto } from './dto/update-block-list.dto';

@ApiTags('block-lists')
@Controller('block-lists')
export class BlockListsController extends BaseController<BlockList> {
    constructor(private readonly blockListsService: BlockListsService) {
        super(blockListsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get block list profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return block list profile.' })
    async getBlockListProfile(@Param('id', ParseIntPipe) id: number): Promise<BlockList> {
        return this.blockListsService.getBlockListProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user block list' })
    @ApiResponse({ status: 200, description: 'Return user block list.' })
    async getUserBlockList(@Param('userId', ParseIntPipe) userId: number): Promise<BlockList[]> {
        return this.blockListsService.getUserBlockList(userId);
    }

    @Get('blocked/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get blocked users' })
    @ApiResponse({ status: 200, description: 'Return blocked users.' })
    async getBlockedUsers(@Param('userId', ParseIntPipe) userId: number): Promise<BlockList[]> {
        return this.blockListsService.getBlockedUsers(userId);
    }

    @Get('blocked-by/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get blocked by users' })
    @ApiResponse({ status: 200, description: 'Return blocked by users.' })
    async getBlockedByUsers(@Param('userId', ParseIntPipe) userId: number): Promise<BlockList[]> {
        return this.blockListsService.getBlockedByUsers(userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new block list entry' })
    @ApiResponse({ status: 201, description: 'The block list entry has been successfully created.' })
    async create(@Body() createBlockListDto: CreateBlockListDto): Promise<BlockList> {
        return this.blockListsService.create(createBlockListDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a block list entry' })
    @ApiResponse({ status: 200, description: 'The block list entry has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBlockListDto: UpdateBlockListDto,
    ): Promise<BlockList> {
        return this.blockListsService.update(id, updateBlockListDto);
    }
} 