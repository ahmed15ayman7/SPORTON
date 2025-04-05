import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Player, PlayerStatistics, PlayerDiscovery, Contract, Transfer, ScoutingReport, AgentClient, Club } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
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
            TeamCategory: true,
            statistics: true,
            contracts: true,
            achievements: true,
            injuries: true,
            AgentClient: true,
            Transfer: true,
            ScoutingReport: true,
            PlayerDiscovery: true,
        };
    }
    async createPlayer(data: Player): Promise<Player> {
        return this.prisma.player.create({
            data: {
                userId: data.userId,
                position: data.position,
                jerseyNumber: data.jerseyNumber,
                height: data.height,
                weight: data.weight,
                dateOfBirth: data.dateOfBirth,
                foot: data.foot,
                marketValue: data.marketValue,
                currentTeamId: data.currentTeamId,
                facilityId: data.facilityId,
            },
        });
    }

    async updatePlayer(id: number, data: Player): Promise<Player> {
        return this.prisma.player.update({
            where: { id },
            data: {
                position: data.position,
                jerseyNumber: data.jerseyNumber,
                height: data.height,
                weight: data.weight,
                dateOfBirth: data.dateOfBirth,
                foot: data.foot,
                marketValue: data.marketValue,
                currentTeamId: data.currentTeamId,
                facilityId: data.facilityId,
            },
        });
    }
    async findAll(params: PaginationDto): Promise<PaginatedResponse<Player>> {
        const { skip, take } = params;
        const players = await this.prisma.player.findMany({
            skip,
            take,
            include: this.getIncludeFields(),
        });
        const total = await this.prisma.player.count();
        return {
            data: players,
            meta: { total, skip: skip || 0, take: take || 10, hasMore: (skip || 0) + (take || 10) < total },
        };
    }
    async deletePlayer(id: number): Promise<Player> {
        return this.prisma.player.delete({
            where: { id },
        });
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

    async getPlayerStatistics(id: number): Promise<PlayerStatistics | null> {
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

    async getPlayerDiscovery(id: number): Promise<PlayerDiscovery[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                PlayerDiscovery: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.PlayerDiscovery || [];
    }

    async getPlayerContracts(id: number): Promise<Contract[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                contracts: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.contracts;
    }

    async getPlayerTransfers(id: number): Promise<Transfer[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                Transfer: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.Transfer;
    }

    async getPlayerScoutingReports(id: number): Promise<ScoutingReport[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                ScoutingReport: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.ScoutingReport;
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

    async getPlayerAgentClient(id: number): Promise<AgentClient[]> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                AgentClient: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.AgentClient;
    }

    async getPlayerCurrentTeam(id: number): Promise<Club | null> {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                currentTeam: true,
            },
        });
        if (!player) {
            throw new NotFoundException('اللاعب غير موجود');
        }
        return player.currentTeam;
    }

} 