import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { PostsService } from './posts.service';
import { Post as PostModel } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreatePostDto } from '@/dtos/Post.create.dto';
import { UpdatePostDto } from '@/dtos/Post.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('المنشورات')
@Controller('posts')
export class PostsController extends BaseController<PostModel> {
    constructor(private readonly postsService: PostsService) {
        super(postsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء منشور جديد', 'none', null, CreatePostDto, 'المنشورات')
    create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
        return this.postsService.create(createPostDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث منشور معين', 'none', UpdatePostDto, null, 'المنشورات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<PostModel> {
        return this.postsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المنشورات', 'none', null, null, 'المنشورات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<PostModel>> {
        return this.postsService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على منشور معين', 'none', null, null, 'المنشورات')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
        return this.postsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على ملف المنشور بجميع العلاقات', 'none', null, null, 'المنشورات')
    async getPostProfile(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPostProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على منشورات المستخدم', 'none', null, null, 'المنشورات')
    async getUserPosts(@Param('userId', ParseIntPipe) userId: number) {
        return this.postsService.getUserPosts(userId);
    }

    @Get('achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على منشورات المؤنثات', 'none', null, null, 'المنشورات')
    async getAchievementPosts() {
        return this.postsService.getAchievementPosts();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف منشور معين', 'none', null, null, 'المنشورات')
    remove(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
        return this.postsService.remove(id);
    }
} 