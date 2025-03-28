import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Scout } from '@prisma/client';

@Injectable()
export class ScoutsService extends BaseService<Scout> {
    constructor(prisma: PrismaService) {
        super(prisma, 'scout');
    }

    protected getSearchFields(): string[] {
        return ['specialization', 'regions'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            reports: true,
            discoveries: true,
            performanceReports: true,
            performanceReportCoaches: true,
            subscriptions: true,
            payments: true,
            reports: true,
            reported: true,
            competitionParticipants: true,
            userBehaviors: true,
            trainingReviews: true,
            userSegments: true,
            productReviews: true,
            orders: true,
            addresses: true,
            receivedEndorsements: true,
            athleteMetrics: true,
            articles: true,
            advertisements: true,
            events: true,
            eventParticipants: true,
            professionalAchievements: true,
            socialMedia: true,
            notificationSettings: true,
            notifications: true,
            products: true,
        };
    }

    async getScoutProfile(id: number): Promise<Scout> {
        const scout = await this.prisma.scout.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!scout) {
            throw new NotFoundException('الكشاف غير موجود');
        }
        return scout;
    }

    async getScoutReports(id: number): Promise<any[]> {
        const scout = await this.prisma.scout.findUnique({
            where: { id },
            include: {
                reports: true,
            },
        });
        if (!scout) {
            throw new NotFoundException('الكشاف غير موجود');
        }
        return scout.reports;
    }

    async getScoutDiscoveries(id: number): Promise<any[]> {
        const scout = await this.prisma.scout.findUnique({
            where: { id },
            include: {
                discoveries: true,
            },
        });
        if (!scout) {
            throw new NotFoundException('الكشاف غير موجود');
        }
        return scout.discoveries;
    }
} 