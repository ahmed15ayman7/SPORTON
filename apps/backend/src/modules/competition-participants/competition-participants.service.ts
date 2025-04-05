import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CompetitionParticipant, ParticipationStatus } from '@prisma/client';

@Injectable()
export class CompetitionParticipantsService extends BaseService<CompetitionParticipant> {
    constructor(prisma: PrismaService) {
        super(prisma, 'competitionParticipant');
    }

    protected getSearchFields(): string[] {
        return ['status'];
    }

    protected getIncludeFields(): object {
        return {
            competition: true,
            participant: true,
        };
    }

    async getCompetitionParticipantProfile(id: number): Promise<CompetitionParticipant> {
        const participant = await this.prisma.competitionParticipant.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!participant) {
            throw new NotFoundException('المشارك غير موجود');
        }
        return participant;
    }

    async getCompetitionParticipants(competitionId: number): Promise<CompetitionParticipant[]> {
        const participants = await this.prisma.competitionParticipant.findMany({
            where: { competitionId },
            include: this.getIncludeFields(),
            orderBy: [
                { rank: 'asc' },
                { score: 'desc' },
            ],
        });
        return participants;
    }

    async getUserParticipations(participantId: number): Promise<CompetitionParticipant[]> {
        const participations = await this.prisma.competitionParticipant.findMany({
            where: { participantId },
            include: this.getIncludeFields(),
            orderBy: {
                competition: {
                    startDate: 'desc',
                },
            },
        });
        return participations;
    }

    async getParticipantsByStatus(competitionId: number, status: string): Promise<CompetitionParticipant[]> {
        const participants = await this.prisma.competitionParticipant.findMany({
            where: {
                competitionId,
                status: status as any,
            },
            include: this.getIncludeFields(),
            orderBy: [
                { rank: 'asc' },
                { score: 'desc' },
            ],
        });
        return participants;
    }

    async updateParticipantRank(id: number, rank: number): Promise<CompetitionParticipant> {
        return this.prisma.competitionParticipant.update({
            where: { id },
            data: { rank },
            include: this.getIncludeFields(),
        });
    }

    async updateParticipantScore(id: number, score: number): Promise<CompetitionParticipant> {
        return this.prisma.competitionParticipant.update({
            where: { id },
            data: { score },
            include: this.getIncludeFields(),
        });
    }

    async getCompetitionStandings(competitionId: number): Promise<CompetitionParticipant[]> {
        const participants = await this.prisma.competitionParticipant.findMany({
            where: {
                competitionId,
                status: ParticipationStatus.CONFIRMED,
            },
            include: this.getIncludeFields(),
            orderBy: [
                { rank: 'asc' },
                { score: 'desc' },
            ],
        });
        return participants;
    }
} 