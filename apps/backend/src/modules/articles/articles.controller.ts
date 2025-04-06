import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { BaseController } from '@/common/controllers/base.controller';
import { Article } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('المقالات')
@Controller('articles')
export class ArticlesController extends BaseController<Article> {
    constructor(private readonly articlesService: ArticlesService) {
        super(articlesService);
    }

    @Post()
    @ApiOperation({ summary: 'إنشاء مقال جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء المقال بنجاح' })
    async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المقالات' })
    @ApiResponse({ status: 200, description: 'تم جلب المقالات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Article>> {
        return this.articlesService.findAll(search);
    }

    @Get('popular')
    @ApiOperation({ summary: 'الحصول على المقالات الأكثر مشاهدة' })
    @ApiResponse({ status: 200, description: 'تم جلب المقالات الأكثر مشاهدة بنجاح' })
    getPopularArticles(@Query('limit') limit?: number) {
        return this.articlesService.getPopularArticles(limit);
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل المقال' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل المقال بنجاح' })
    getArticleProfile(@Param('id') id: string) {
        return this.articlesService.getArticleProfile(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على مقالات المستخدم' })
    @ApiResponse({ status: 200, description: 'تم جلب مقالات المستخدم بنجاح' })
    async getUserArticles(@Param('userId') userId: number): Promise<Article[]> {
        return this.articlesService.getUserArticles(+userId);
    }

    @Get('category/:categoryId')
    @ApiOperation({ summary: 'الحصول على مقالات الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب مقالات الفئة بنجاح' })
    async getCategoryArticles(@Param('categoryId') categoryId: number): Promise<Article[]> {
        return this.articlesService.getCategoryArticles(+categoryId);
    }


    @Post(':id/view')
    @ApiOperation({ summary: 'زيادة عدد المشاهدات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المشاهدات بنجاح' })
    async incrementViews(@Param('id') id: number): Promise<Article> {
        return this.articlesService.incrementViews(+id);
    }
} 