import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Agent } from '@prisma/client';

@Injectable()
export class AgentsService extends BaseService<Agent> {
    constructor(prisma: PrismaService) {
        super(prisma, 'agent');
    }

    protected getSearchFields(): string[] {
        return ['license', 'agency'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            players: true,
            contracts: true,
            transfers: true,
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

    async getAgentProfile(id: number): Promise<Agent> {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!agent) {
            throw new NotFoundException('الوكيل غير موجود');
        }
        return agent;
    }

    async getAgentPlayers(id: number): Promise<any[]> {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: {
                players: true,
            },
        });
        if (!agent) {
            throw new NotFoundException('الوكيل غير موجود');
        }
        return agent.players;
    }

    async getAgentContracts(id: number): Promise<any[]> {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: {
                contracts: true,
            },
        });
        if (!agent) {
            throw new NotFoundException('الوكيل غير موجود');
        }
        return agent.contracts;
    }

    async getAgentTransfers(id: number): Promise<any[]> {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: {
                transfers: true,
            },
        });
        if (!agent) {
            throw new NotFoundException('الوكيل غير موجود');
        }
        return agent.transfers;
    }
} 