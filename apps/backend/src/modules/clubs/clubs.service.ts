import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Club } from '@shared/prisma';

@Injectable()
export class ClubsService extends BaseService<Club> {
    constructor(prisma: PrismaService) {
        super(prisma, 'club');
    }

    protected getSearchFields(): string[] {
        return ['stadium'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            players: true,
            coaches: true,
            facilities: true,
            teams: true,
            tournaments: true,
            contracts: true,
            transfers: true,
            transfersTo: true,
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

    async getClubProfile(id: number): Promise<Club> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club;
    }

    async getClubPlayers(id: number): Promise<any[]> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: {
                players: true,
            },
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club.players;
    }

    async getClubCoaches(id: number): Promise<any[]> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: {
                coaches: true,
            },
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club.coaches;
    }

    async getClubFacilities(id: number): Promise<any[]> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: {
                facilities: true,
            },
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club.facilities;
    }

    async getClubTeams(id: number): Promise<any[]> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: {
                teams: true,
            },
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club.teams;
    }

    async getClubTournaments(id: number): Promise<any[]> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: {
                tournaments: true,
            },
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club.tournaments;
    }

    async getClubContracts(id: number): Promise<any[]> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: {
                Contract: true,
            },
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club.Contract;
    }

    async getClubTransfers(id: number): Promise<any[]> {
        const club = await this.prisma.club.findUnique({
            where: { id },
            include: {
                Transfer: true,
            },
        });
        if (!club) {
            throw new NotFoundException('النادي غير موجود');
        }
        return club.Transfer;
    }
}