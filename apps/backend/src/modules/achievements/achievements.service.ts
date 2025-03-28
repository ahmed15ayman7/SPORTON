import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Achievement } from '@prisma/client';

@Injectable()
export class AchievementsService extends BaseService<Achievement> {
    constructor(prisma: PrismaService) {
        super(prisma, 'achievement');
    }

    protected getSearchFields(): string[] {
        return ['title', 'details'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            Player: true,
            Coach: true,
        };
    }

    async getAchievementProfile(id: number): Promise<Achievement> {
        const achievement = await this.prisma.achievement.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!achievement) {
            throw new NotFoundException('الإنجاز غير موجود');
        }
        return achievement;
    }

    async getUserAchievements(userId: number): Promise<Achievement[]> {
        const achievements = await this.prisma.achievement.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return achievements;
    }
} 