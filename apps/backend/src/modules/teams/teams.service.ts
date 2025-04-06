import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Team } from '@shared/prisma';

@Injectable()
export class TeamsService extends BaseService<Team> {
    constructor(prisma: PrismaService) {
        super(prisma, 'team');
    }

    protected getSearchFields(): string[] {
        return ['name', 'description', 'achievements'];
    }

    protected getIncludeFields(): object {
        return {
            members: {
                include: {
                    user: true,
                },
            },
        };
    }

    async getTeamProfile(id: number): Promise<Team> {
        const team = await this.prisma.team.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!team) {
            throw new NotFoundException('الفريق غير موجود');
        }
        return team;
    }

    async getUserTeams(userId: number): Promise<Team[]> {
        const teams = await this.prisma.team.findMany({
            where: {
                members: {
                    some: {
                        userId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return teams;
    }

    async getSportTeams(sport: string): Promise<Team[]> {
        const teams = await this.prisma.team.findMany({
            where: {
                sport: sport as any,
            },
            include: this.getIncludeFields(),
        });
        return teams;
    }
} 