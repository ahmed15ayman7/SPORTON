import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Subscription, SubscriptionStatus, PlanType } from '@prisma/client';

@Injectable()
export class SubscriptionsService extends BaseService<Subscription> {
    constructor(prisma: PrismaService) {
        super(prisma, 'subscription');
    }

    protected getSearchFields(): string[] {
        return ['features'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getSubscriptionProfile(id: number): Promise<Subscription> {
        const subscription = await this.prisma.subscription.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!subscription) {
            throw new NotFoundException('الاشتراك غير موجود');
        }
        return subscription;
    }

    async getUserSubscriptions(userId: number): Promise<Subscription[]> {
        const subscriptions = await this.prisma.subscription.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: {
                startDate: 'desc',
            },
        });
        return subscriptions;
    }

    async getActiveSubscriptions(): Promise<Subscription[]> {
        const subscriptions = await this.prisma.subscription.findMany({
            where: {
                status: 'ACTIVE',
                endDate: {
                    gt: new Date(),
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                startDate: 'desc',
            },
        });
        return subscriptions;
    }

    async getExpiredSubscriptions(): Promise<Subscription[]> {
        const subscriptions = await this.prisma.subscription.findMany({
            where: {
                endDate: {
                    lt: new Date(),
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                endDate: 'desc',
            },
        });
        return subscriptions;
    }

    async getSubscriptionsByPlan(plan: string): Promise<Subscription[]> {
        const subscriptions = await this.prisma.subscription.findMany({
            where: { plan: plan as PlanType },
            include: this.getIncludeFields(),
            orderBy: {
                startDate: 'desc',
            },
        });
        return subscriptions;
    }

    async getSubscriptionsByStatus(status: SubscriptionStatus): Promise<Subscription[]> {
        const subscriptions = await this.prisma.subscription.findMany({
            where: { status },
            include: this.getIncludeFields(),
            orderBy: {
                startDate: 'desc',
            },
        });
        return subscriptions;
    }

    async updateSubscriptionStatus(id: number, status: SubscriptionStatus): Promise<Subscription> {
        return this.prisma.subscription.update({
            where: { id },
            data: { status },
            include: this.getIncludeFields(),
        });
    }
} 