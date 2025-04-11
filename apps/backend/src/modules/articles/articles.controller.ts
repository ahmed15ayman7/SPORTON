import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from '../../dtos/Article.create.dto';
import { UpdateArticleDto } from '../../dtos/Article.update.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { Article } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('المقالات')
@Controller('articles')
export class ArticlesController extends BaseController<Article> {
    constructor(private readonly articlesService: ArticlesService) {
        super(articlesService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateArticleDto, "المقالات")
    @ApiOperation({ summary: 'إنشاء مقال جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء المقال بنجاح' })
    async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.create(createArticleDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateArticleDto, null, "المقالات")
    async update(@Param('id') id: number, @Body() data: any): Promise<Article> {
        return this.articlesService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "المقالات")
    @ApiOperation({ summary: 'الحصول على جميع المقالات' })
    @ApiResponse({ status: 200, description: 'تم جلب المقالات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Article>> {
        return this.articlesService.findAll(search);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "المقالات")
    async findOne(@Param('id') id: number): Promise<Article> {
        return this.articlesService.findOne(id);
    }

    @Get('popular')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على المقالات الأكثر مشاهدة' })
    @ApiResponse({ status: 200, description: 'تم جلب المقالات الأكثر مشاهدة بنجاح' })
    getPopularArticles(@Query('limit') limit?: number) {
        return this.articlesService.getPopularArticles(limit);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تفاصيل المقال' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل المقال بنجاح' })
    getArticleProfile(@Param('id') id: string) {
        return this.articlesService.getArticleProfile(+id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على مقالات المستخدم' })
    @ApiResponse({ status: 200, description: 'تم جلب مقالات المستخدم بنجاح' })
    async getUserArticles(@Param('userId') userId: number): Promise<Article[]> {
        return this.articlesService.getUserArticles(+userId);
    }

    @Get('category/:categoryId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على مقالات الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب مقالات الفئة بنجاح' })
    async getCategoryArticles(@Param('categoryId') categoryId: number): Promise<Article[]> {
        return this.articlesService.getCategoryArticles(+categoryId);
    }


    @Post(':id/view')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'زيادة عدد المشاهدات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المشاهدات بنجاح' })
    async incrementViews(@Param('id') id: number): Promise<Article> {
        return this.articlesService.incrementViews(+id);
    }
} 