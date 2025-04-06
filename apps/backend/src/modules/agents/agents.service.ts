import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Agent, Player } from '@shared/prisma';

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

    async getAgentPlayers(id: number): Promise<Player[]> {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: {
                clients: {
                    include: {
                        player: true
                    }
                },
            },
        });
        if (!agent) {
            throw new NotFoundException('الوكيل غير موجود');
        }
        return agent.clients.map(client => client.player);
    }

    async getAgentContracts(id: number): Promise<any[]> {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: {
                Contract: true,
            },
        });
        if (!agent) {
            throw new NotFoundException('الوكيل غير موجود');
        }
        return agent.Contract;
    }

    async getAgentTransfers(id: number): Promise<any[]> {
        const agent = await this.prisma.agent.findUnique({
            where: { id },
            include: {
                deals: true,
            },
        });
        if (!agent) {
            throw new NotFoundException('الوكيل غير موجود');
        }
        return agent.deals;
    }
} 