import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService extends BaseService<Comment> {
    constructor(prisma: PrismaService) {
        super(prisma, 'comment');
    }

    protected getSearchFields(): string[] {
        return ['content'];
    }

    protected getIncludeFields(): object {
        return {
            author: true,
            article: true,
        };
    }

    async getCommentProfile(id: number): Promise<Comment> {
        const comment = await this.prisma.comment.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!comment) {
            throw new NotFoundException('التعليق غير موجود');
        }
        return comment;
    }

    async getArticleComments(articleId: number): Promise<Comment[]> {
        const comments = await this.prisma.comment.findMany({
            where: { articleId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return comments;
    }

    async getUserComments(userId: number): Promise<Comment[]> {
        const comments = await this.prisma.comment.findMany({
            where: { authorId: userId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return comments;
    }
} 