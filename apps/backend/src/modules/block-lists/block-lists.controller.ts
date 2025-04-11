import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { BlockListsService } from './block-lists.service';
import { BlockList } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateBlockListDto } from '../../dtos/BlockList.create.dto';
import { UpdateBlockListDto } from '../../dtos/BlockList.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('block-lists')
@Controller('block-lists')
export class BlockListsController extends BaseController<BlockList> {
    constructor(private readonly blockListsService: BlockListsService) {
        super(blockListsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateBlockListDto, "قائمة الحظر")
    async create(@Body() data: any): Promise<BlockList> {
        return this.blockListsService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateBlockListDto, null, "قائمة الحظر")
    async update(@Param('id') id: number, @Body() data: any): Promise<BlockList> {
        return this.blockListsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "قائمة الحظر")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<BlockList>> {
        return this.blockListsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "قائمة الحظر")
    async findOne(@Param('id') id: number): Promise<BlockList> {
        return this.blockListsService.findOne(id);
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

} 