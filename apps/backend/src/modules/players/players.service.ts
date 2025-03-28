import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Player } from '@prisma/client';

@Injectable()
export class PlayersService extends BaseService<Player> {
    constructor(prisma: PrismaService) {
        super(prisma, 'player');
    }

    protected getSearchFields(): string[] {
        return ['position', 'jerseyNumber'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            currentTeam: true,
            teams: true,
            statistics: true,
            injuries: true,
            certificates: true,
            experiences: true,
            educations: true,
            skills: true,
            achievements: true,
            endorsements: true,
            availability: true,
            trainingPlayers: true,
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

    async getPlayerProfile(id: number): Promise<Player> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player;
    }

    async getPlayerStatistics(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                statistics: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.statistics;
    }

    async getPlayerInjuries(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                injuries: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.injuries;
    }

    async getPlayerCertificates(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                certificates: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.certificates;
    }

    async getPlayerExperiences(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                experiences: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.experiences;
    }

    async getPlayerEducations(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                educations: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.educations;
    }

    async getPlayerSkills(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                skills: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.skills;
    }

    async getPlayerAchievements(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                achievements: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.achievements;
    }

    async getPlayerEndorsements(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                endorsements: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.endorsements;
    }

    async getPlayerAvailability(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                availability: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.availability;
    }

    async getPlayerPerformanceReports(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                performanceReports: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.performanceReports;
    }

    async getPlayerAthleteMetrics(id: number): Promise<any> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                athleteMetrics: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.athleteMetrics;
    }

    async getPlayerProfessionalAchievements(id: number): Promise<any[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                professionalAchievements: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.professionalAchievements;
    }
} 