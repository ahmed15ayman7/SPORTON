import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('التعليقات')
@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء تعليق جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء التعليق بنجاح' })
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع التعليقات' })
    @ApiResponse({ status: 200, description: 'تم جلب التعليقات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.commentsService.findAll(search);
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل التعليق' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل التعليق بنجاح' })
    getCommentProfile(@Param('id') id: string) {
        return this.commentsService.getCommentProfile(+id);
    }

    @Get('article/:articleId')
    @ApiOperation({ summary: 'الحصول على تعليقات المقال' })
    @ApiResponse({ status: 200, description: 'تم جلب تعليقات المقال بنجاح' })
    getArticleComments(@Param('articleId') articleId: string) {
        return this.commentsService.getArticleComments(+articleId);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على تعليقات المستخدم' })
    @ApiResponse({ status: 200, description: 'تم جلب تعليقات المستخدم بنجاح' })
    getUserComments(@Param('userId') userId: string) {
        return this.commentsService.getUserComments(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث التعليق' })
    @ApiResponse({ status: 200, description: 'تم تحديث التعليق بنجاح' })
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف التعليق' })
    @ApiResponse({ status: 200, description: 'تم حذف التعليق بنجاح' })
    remove(@Param('id') id: string) {
        return this.commentsService.remove(+id);
    }
} 