import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { ReactionsService } from './reactions.service';
import { Reaction } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateReactionDto } from '@/dtos/Reaction.create.dto';
import { UpdateReactionDto } from '@/dtos/Reaction.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('reactions')
@Controller('reactions')
export class ReactionsController extends BaseController<Reaction> {
    constructor(private readonly reactionsService: ReactionsService) {
        super(reactionsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء تفاعل جديد', 'none', null, CreateReactionDto, 'التفاعلات')
    async create(@Body() createReactionDto: CreateReactionDto) {
        return this.reactionsService.create(createReactionDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تفاعل محدد', 'none', UpdateReactionDto, null, 'التفاعلات')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.reactionsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التفاعلات', 'none', null, null, 'التفاعلات')
    @ApiQuery({ type: PaginationDto })
    async findAll(@Query() params: PaginationDto) {
        return this.reactionsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل التفاعل', 'none', null, null, 'التفاعلات')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.reactionsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل التفاعل', 'none', null, null, 'التفاعلات')
    async getReactionProfile(@Param('id', ParseIntPipe) id: number) {
        return this.reactionsService.getReactionProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاعلات المستخدم', 'none', null, null, 'التفاعلات')
    async getUserReactions(@Param('userId', ParseIntPipe) userId: number) {
        return this.reactionsService.getUserReactions(userId);
    }

    @Get('post/:postId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاعلات المنشور', 'none', null, null, 'التفاعلات')
    async getPostReactions(@Param('postId', ParseIntPipe) postId: number) {
        return this.reactionsService.getPostReactions(postId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تفاعل محدد', 'none', null, null, 'التفاعلات')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.reactionsService.remove(id);
    }
} 