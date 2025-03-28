import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService extends BaseService<Article> {
    constructor(prisma: PrismaService) {
        super(prisma, 'article');
    }

    protected getSearchFields(): string[] {
        return ['title', 'content', 'tags'];
    }

    protected getIncludeFields(): object {
        return {
            author: true,
            categories: true,
            comments: {
                include: {
                    author: true,
                },
            },
        };
    }

    async getArticleProfile(id: number): Promise<Article> {
        const article = await this.prisma.article.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!article) {
            throw new NotFoundException('المقال غير موجود');
        }
        return article;
    }

    async getUserArticles(userId: number): Promise<Article[]> {
        const articles = await this.prisma.article.findMany({
            where: { authorId: userId },
            include: this.getIncludeFields(),
        });
        return articles;
    }

    async getCategoryArticles(categoryId: number): Promise<Article[]> {
        const articles = await this.prisma.article.findMany({
            where: {
                categories: {
                    some: {
                        id: categoryId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return articles;
    }

    async incrementViews(id: number): Promise<Article> {
        const article = await this.prisma.article.update({
            where: { id },
            data: {
                views: {
                    increment: 1,
                },
            },
            include: this.getIncludeFields(),
        });
        return article;
    }

    async getPopularArticles(limit: number = 10): Promise<Article[]> {
        const articles = await this.prisma.article.findMany({
            orderBy: {
                views: 'desc',
            },
            take: limit,
            include: this.getIncludeFields(),
        });
        return articles;
    }
} 