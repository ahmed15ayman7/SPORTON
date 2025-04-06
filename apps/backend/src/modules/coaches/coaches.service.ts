import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Coach } from '@shared/prisma';

@Injectable()
export class CoachesService extends BaseService<Coach> {
    constructor(prisma: PrismaService) {
        super(prisma, 'coach');
    }

    protected getSearchFields(): string[] {
        return ['specialization', 'methodology'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            teams: true,
            trainings: true,
            achievements: true,
            licenses: true,
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

    async getCoachProfile(id: number): Promise<Coach> {
        const coach = await this.prisma.coach.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!coach) {
            throw new NotFoundException('المدرب غير موجود');
        }
        return coach;
    }

    async getCoachTeams(id: number): Promise<any[]> {
        const coach = await this.prisma.coach.findUnique({
            where: { id },
            include: {
                teams: true,
            },
        });
        if (!coach) {
            throw new NotFoundException('المدرب غير موجود');
        }
        return coach.teams;
    }

    async getCoachTrainings(id: number): Promise<any[]> {
        const coach = await this.prisma.coach.findUnique({
            where: { id },
            include: {
                trainings: true,
            },
        });
        if (!coach) {
            throw new NotFoundException('المدرب غير موجود');
        }
        return coach.trainings;
    }

    async getCoachLicenses(id: number): Promise<any[]> {
        const coach = await this.prisma.coach.findUnique({
            where: { id },
            include: {
                licenses: true,
            },
        });
        if (!coach) {
            throw new NotFoundException('المدرب غير موجود');
        }
        return coach.licenses;
    }

    async getCoachAchievements(id: number): Promise<any[]> {
        const coach = await this.prisma.coach.findUnique({
            where: { id },
            include: {
                achievements: true,
            },
        });
        if (!coach) {
            throw new NotFoundException('المدرب غير موجود');
        }
        return coach.achievements;
    }

    async getCoachPerformanceReports(id: number): Promise<any[]> {
        const coach = await this.prisma.coach.findUnique({
            where: { id },
            include: {
                PerformanceReport: true,
            },
        });
        if (!coach) {
            throw new NotFoundException('المدرب غير موجود');
        }
        return coach.PerformanceReport;
    }

    async getCoachProfessionalAchievements(id: number): Promise<any[]> {
        const coach = await this.prisma.coach.findUnique({
            where: { id },
            include: {
                achievements: true,
            },
        });
        if (!coach) {
            throw new NotFoundException('المدرب غير موجود');
        }
        return coach.achievements;
    }
} 