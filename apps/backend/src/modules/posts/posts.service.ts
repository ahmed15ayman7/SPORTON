import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService extends BaseService<Post> {
    constructor(prisma: PrismaService) {
        super(prisma, 'post');
    }

    protected getSearchFields(): string[] {
        return ['text'];
    }

    protected getIncludeFields(): object {
        return {
            author: true,
            reactions: true,
        };
    }

    async getPostProfile(id: number): Promise<Post> {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!post) {
            throw new NotFoundException('المنشور غير موجود');
        }
        return post;
    }

    async getUserPosts(userId: number): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            where: { authorId: userId },
            include: this.getIncludeFields(),
        });
        return posts;
    }

    async getAchievementPosts(): Promise<Post[]> {
        const posts = await this.prisma.post.findMany({
            where: { isAchievement: true },
            include: this.getIncludeFields(),
        });
        return posts;
    }
} 