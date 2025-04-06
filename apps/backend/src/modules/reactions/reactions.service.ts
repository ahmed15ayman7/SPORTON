import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Reaction } from '@shared/prisma';

@Injectable()
export class ReactionsService extends BaseService<Reaction> {
    constructor(prisma: PrismaService) {
        super(prisma, 'reaction');
    }

    protected getSearchFields(): string[] {
        return ['emoji'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            post: true,
        };
    }

    async getReactionProfile(id: number): Promise<Reaction> {
        const reaction = await this.prisma.reaction.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!reaction) {
            throw new NotFoundException('التفاعل غير موجود');
        }
        return reaction;
    }

    async getUserReactions(userId: number): Promise<Reaction[]> {
        const reactions = await this.prisma.reaction.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return reactions;
    }

    async getPostReactions(postId: number): Promise<Reaction[]> {
        const reactions = await this.prisma.reaction.findMany({
            where: { postId },
            include: this.getIncludeFields(),
        });
        return reactions;
    }
} 