import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserBehavior } from '@prisma/client';

@Injectable()
export class UserBehaviorsService extends BaseService<UserBehavior> {
    constructor(prisma: PrismaService) {
        super(prisma, 'userBehavior');
    }

    protected getSearchFields(): string[] {
        return ['interactionType', 'contentType'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getUserBehaviorProfile(id: number): Promise<UserBehavior> {
        const behavior = await this.prisma.userBehavior.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!behavior) {
            throw new NotFoundException('سلوك المستخدم غير موجود');
        }
        return behavior;
    }

    async getUserBehaviors(userId: number) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: {
                timestamp: 'desc',
            },
        });
        return behaviors;
    }

    async getBehaviorsByType(interactionType: string) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: { interactionType },
            include: this.getIncludeFields(),
            orderBy: {
                timestamp: 'desc',
            },
        });
        return behaviors;
    }

    async getBehaviorsByContentType(contentType: string) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: { contentType },
            include: this.getIncludeFields(),
            orderBy: {
                timestamp: 'desc',
            },
        });
        return behaviors;
    }

    async getBehaviorsByDateRange(startDate: Date, endDate: Date) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: {
                timestamp: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                timestamp: 'desc',
            },
        });
        return behaviors;
    }

    async getBehaviorsByDayOfWeek(dayOfWeek: number) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: { dayOfWeek },
            include: this.getIncludeFields(),
            orderBy: {
                timestamp: 'desc',
            },
        });
        return behaviors;
    }

    async getPositiveBehaviors(userId: number) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: {
                userId,
                isPositive: true,
            },
            include: this.getIncludeFields(),
            orderBy: {
                timestamp: 'desc',
            },
        });
        return behaviors;
    }

    async getNegativeBehaviors(userId: number) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: {
                userId,
                isPositive: false,
            },
            include: this.getIncludeFields(),
            orderBy: {
                timestamp: 'desc',
            },
        });
        return behaviors;
    }

    async getUserBehaviorAnalytics(userId: number) {
        const behaviors = await this.prisma.userBehavior.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });

        const analytics = {
            totalInteractions: behaviors.length,
            averageTimeSpent: behaviors.reduce((acc, curr) => acc + (curr.timeSpent || 0), 0) / behaviors.length,
            averageScore: behaviors.reduce((acc, curr) => acc + (curr.score || 0), 0) / behaviors.length,
            averageSessionDuration: behaviors.reduce((acc, curr) => acc + (curr.sessionDuration || 0), 0) / behaviors.length,
            positiveInteractions: behaviors.filter(b => b.isPositive).length,
            negativeInteractions: behaviors.filter(b => !b.isPositive).length,
            interactionTypes: this.getInteractionTypeDistribution(behaviors),
            contentTypes: this.getContentTypeDistribution(behaviors),
            dayOfWeekDistribution: this.getDayOfWeekDistribution(behaviors),
        };

        return analytics;
    }

    private getInteractionTypeDistribution(behaviors: UserBehavior[]) {
        const distribution = {};
        behaviors.forEach(behavior => {
            distribution[behavior.interactionType] = (distribution[behavior.interactionType] || 0) + 1;
        });
        return distribution;
    }

    private getContentTypeDistribution(behaviors: UserBehavior[]) {
        const distribution = {};
        behaviors.forEach(behavior => {
            distribution[behavior.contentType] = (distribution[behavior.contentType] || 0) + 1;
        });
        return distribution;
    }

    private getDayOfWeekDistribution(behaviors: UserBehavior[]) {
        const distribution = {};
        behaviors.forEach(behavior => {
            distribution[behavior.dayOfWeek] = (distribution[behavior.dayOfWeek] || 0) + 1;
        });
        return distribution;
    }
} 