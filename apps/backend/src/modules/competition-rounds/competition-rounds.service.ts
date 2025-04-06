import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CompetitionRound } from '@shared/prisma';

@Injectable()
export class CompetitionRoundsService extends BaseService<CompetitionRound> {
    constructor(prisma: PrismaService) {
        super(prisma, 'competitionRound');
    }

    protected getSearchFields(): string[] {
        return ['status'];
    }

    protected getIncludeFields(): object {
        return {
            competition: true,
        };
    }

    async getCompetitionRoundProfile(id: number): Promise<CompetitionRound> {
        const round = await this.prisma.competitionRound.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!round) {
            throw new NotFoundException('الجولة غير موجودة');
        }
        return round;
    }

    async getCompetitionRounds(competitionId: number): Promise<CompetitionRound[]> {
        const rounds = await this.prisma.competitionRound.findMany({
            where: { competitionId },
            include: this.getIncludeFields(),
            orderBy: {
                roundNumber: 'asc',
            },
        });
        return rounds;
    }

    async getCurrentRound(competitionId: number): Promise<CompetitionRound | null> {
        const currentRound = await this.prisma.competitionRound.findFirst({
            where: {
                competitionId,
                status: 'IN_PROGRESS',
            },
            include: this.getIncludeFields(),
        });
        return currentRound;
    }

    async getUpcomingRounds(competitionId: number): Promise<CompetitionRound[]> {
        const upcomingRounds = await this.prisma.competitionRound.findMany({
            where: {
                competitionId,
                status: 'UPCOMING',
            },
            include: this.getIncludeFields(),
            orderBy: {
                roundNumber: 'asc',
            },
        });
        return upcomingRounds;
    }

    async getCompletedRounds(competitionId: number): Promise<CompetitionRound[]> {
        const completedRounds = await this.prisma.competitionRound.findMany({
            where: {
                competitionId,
                status: 'COMPLETED',
            },
            include: this.getIncludeFields(),
            orderBy: {
                roundNumber: 'asc',
            },
        });
        return completedRounds;
    }

    async updateRoundStatus(id: number, status: string): Promise<CompetitionRound> {
        return this.prisma.competitionRound.update({
            where: { id },
            data: { status: status as any },
            include: this.getIncludeFields(),
        });
    }
} 