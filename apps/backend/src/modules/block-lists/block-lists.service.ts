import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BlockList } from '@shared/prisma';

@Injectable()
export class BlockListsService extends BaseService<BlockList> {
    constructor(prisma: PrismaService) {
        super(prisma, 'blockList');
    }

    protected getSearchFields(): string[] {
        return [];
    }

    protected getIncludeFields(): object {
        return {
            blocker: true,
            blocked: true,
        };
    }

    async getBlockListProfile(id: number): Promise<BlockList> {
        const blockList = await this.prisma.blockList.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!blockList) {
            throw new NotFoundException('قائمة الحظر غير موجودة');
        }
        return blockList;
    }

    async getUserBlockList(userId: number): Promise<BlockList[]> {
        const blockList = await this.prisma.blockList.findMany({
            where: {
                OR: [
                    { blockerId: userId },
                    { blockedId: userId },
                ],
            },
            include: this.getIncludeFields(),
        });
        return blockList;
    }

    async getBlockedUsers(userId: number): Promise<BlockList[]> {
        const blockList = await this.prisma.blockList.findMany({
            where: { blockerId: userId },
            include: this.getIncludeFields(),
        });
        return blockList;
    }

    async getBlockedByUsers(userId: number): Promise<BlockList[]> {
        const blockList = await this.prisma.blockList.findMany({
            where: { blockedId: userId },
            include: this.getIncludeFields(),
        });
        return blockList;
    }
} 