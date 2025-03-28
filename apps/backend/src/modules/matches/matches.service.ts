import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Match } from '@prisma/client';

@Injectable()
export class MatchesService extends BaseService<Match> {
    constructor(prisma: PrismaService) {
        super(prisma, 'match');
    }

    protected getSearchFields(): string[] {
        return ['teamA', 'teamB', 'location'];
    }

    protected getIncludeFields(): object {
        return {
            players: true,
            Tournament: true,
            ScoutingReport: true,
        };
    }

    async getMatchProfile(id: number): Promise<Match> {
        const match = await this.prisma.match.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!match) {
            throw new NotFoundException('المباراة غير موجودة');
        }
        return match;
    }

    async getTeamMatches(teamName: string): Promise<Match[]> {
        const matches = await this.prisma.match.findMany({
            where: {
                OR: [
                    { teamA: teamName },
                    { teamB: teamName },
                ],
            },
            include: this.getIncludeFields(),
        });
        return matches;
    }

    async getPlayerMatches(playerId: number): Promise<Match[]> {
        const matches = await this.prisma.match.findMany({
            where: {
                players: {
                    some: {
                        id: playerId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return matches;
    }
} 