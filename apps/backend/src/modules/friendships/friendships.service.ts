import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Friendship } from '@prisma/client';

@Injectable()
export class FriendshipsService extends BaseService<Friendship> {
    constructor(prisma: PrismaService) {
        super(prisma, 'friendship');
    }

    protected getSearchFields(): string[] {
        return ['status'];
    }

    protected getIncludeFields(): object {
        return {
            userA: true,
            userB: true,
        };
    }

    async getFriendshipProfile(id: number): Promise<Friendship> {
        const friendship = await this.prisma.friendship.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!friendship) {
            throw new NotFoundException('الصداقة غير موجودة');
        }
        return friendship;
    }

    async getUserFriendships(userId: number): Promise<Friendship[]> {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { userAId: userId },
                    { userBId: userId },
                ],
            },
            include: this.getIncludeFields(),
        });
        return friendships;
    }

    async getAcceptedFriendships(userId: number): Promise<Friendship[]> {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { userAId: userId },
                    { userBId: userId },
                ],
                status: 'accepted',
            },
            include: this.getIncludeFields(),
        });
        return friendships;
    }
} 