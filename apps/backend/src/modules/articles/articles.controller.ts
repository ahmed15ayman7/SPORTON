import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('المقالات')
@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء مقال جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء المقال بنجاح' })
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المقالات' })
    @ApiResponse({ status: 200, description: 'تم جلب المقالات بنجاح' })
    findAll(@Query('search') search?: string) {
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
    getUserArticles(@Param('userId') userId: string) {
        return this.articlesService.getUserArticles(+userId);
    }

    @Get('category/:categoryId')
    @ApiOperation({ summary: 'الحصول على مقالات الفئة' })
    @ApiResponse({ status: 200, description: 'تم جلب مقالات الفئة بنجاح' })
    getCategoryArticles(@Param('categoryId') categoryId: string) {
        return this.articlesService.getCategoryArticles(+categoryId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث المقال' })
    @ApiResponse({ status: 200, description: 'تم تحديث المقال بنجاح' })
    update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articlesService.update(+id, updateArticleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف المقال' })
    @ApiResponse({ status: 200, description: 'تم حذف المقال بنجاح' })
    remove(@Param('id') id: string) {
        return this.articlesService.remove(+id);
    }

    @Post(':id/view')
    @ApiOperation({ summary: 'زيادة عدد المشاهدات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المشاهدات بنجاح' })
    incrementViews(@Param('id') id: string) {
        return this.articlesService.incrementViews(+id);
    }
} 