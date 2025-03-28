import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TeamMember } from '@prisma/client';

@Injectable()
export class TeamMembersService extends BaseService<TeamMember> {
    constructor(prisma: PrismaService) {
        super(prisma, 'teamMember');
    }

    protected getSearchFields(): string[] {
        return ['role'];
    }

    protected getIncludeFields(): object {
        return {
            team: true,
            user: true,
        };
    }

    async getTeamMemberProfile(id: number): Promise<TeamMember> {
        const teamMember = await this.prisma.teamMember.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!teamMember) {
            throw new NotFoundException('عضو الفريق غير موجود');
        }
        return teamMember;
    }

    async getTeamMembers(teamId: number): Promise<TeamMember[]> {
        const teamMembers = await this.prisma.teamMember.findMany({
            where: { teamId },
            include: this.getIncludeFields(),
        });
        return teamMembers;
    }

    async getUserTeamMemberships(userId: number): Promise<TeamMember[]> {
        const teamMemberships = await this.prisma.teamMember.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return teamMemberships;
    }

    async getCurrentTeamMemberships(userId: number): Promise<TeamMember[]> {
        const teamMemberships = await this.prisma.teamMember.findMany({
            where: {
                userId,
                current: true
            },
            include: this.getIncludeFields(),
        });
        return teamMemberships;
    }
} 