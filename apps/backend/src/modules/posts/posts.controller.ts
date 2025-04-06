import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { PostsService } from './posts.service';
import { Post as PostModel } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController extends BaseController<PostModel> {
    constructor(private readonly postsService: PostsService) {
        super(postsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get post profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return post profile.' })
    async getPostProfile(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPostProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user posts' })
    @ApiResponse({ status: 200, description: 'Return user posts.' })
    async getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
        return this.postsService.getUserPosts(userId);
    }

    @Get('achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get achievement posts' })
    @ApiResponse({ status: 200, description: 'Return achievement posts.' })
    async getAchievementPosts() {
        return this.postsService.getAchievementPosts();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
    async create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

} 