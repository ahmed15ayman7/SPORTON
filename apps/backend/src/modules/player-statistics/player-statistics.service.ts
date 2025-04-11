import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlayerStatisticsDto } from '@/dtos/PlayerStatistics.create.dto';
import { UpdatePlayerStatisticsDto } from '@/dtos/PlayerStatistics.update.dto';
import { PlayerStatistics } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseService } from '@/common/services/base.service';
@Injectable()
export class PlayerStatisticsService extends BaseService<PlayerStatistics> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'playerStatistics');
    }

    async create(createPlayerStatisticsDto: CreatePlayerStatisticsDto): Promise<PlayerStatistics> {
        return this.prisma.playerStatistics.create({
            data: {
                playerId: createPlayerStatisticsDto.playerId,
                matches: createPlayerStatisticsDto.matches,
                goals: createPlayerStatisticsDto.goals,
                assists: createPlayerStatisticsDto.assists,
                yellowCards: createPlayerStatisticsDto.yellowCards,
                redCards: createPlayerStatisticsDto.redCards,
                minutesPlayed: createPlayerStatisticsDto.minutesPlayed,
                passAccuracy: createPlayerStatisticsDto.passAccuracy,
                shotAccuracy: createPlayerStatisticsDto.shotAccuracy,
                tackles: createPlayerStatisticsDto.tackles,
                season: createPlayerStatisticsDto.season
            },
            include: {
                player: true
            }
        });
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<PlayerStatistics>> {
        const { skip, take } = query;
        const playerStatistics = await this.prisma.playerStatistics.findMany({
            skip,
            take,
            include: {
                player: true
            }
        });
        return {
            data: playerStatistics,
            meta: { total: playerStatistics.length, skip: skip || 0, take: take || 10, hasMore: playerStatistics.length === take }
        };
    }

    async findOne(id: number): Promise<PlayerStatistics> {
        const statistics = await this.prisma.playerStatistics.findUnique({
            where: { id },
            include: {
                player: true
            }
        });

        if (!statistics) {
            throw new NotFoundException(`إحصائيات اللاعب رقم ${id} غير موجودة`);
        }

        return statistics;
    }

    async findByPlayer(playerId: number): Promise<PlayerStatistics[]> {
        return this.prisma.playerStatistics.findMany({
            where: { playerId },
            include: {
                player: true
            }
        });
    }

    async findBySeason(season: string): Promise<PlayerStatistics[]> {
        return this.prisma.playerStatistics.findMany({
            where: { season },
            include: {
                player: true
            }
        });
    }

    async update(id: number, updatePlayerStatisticsDto: UpdatePlayerStatisticsDto): Promise<PlayerStatistics> {
        try {
            return await this.prisma.playerStatistics.update({
                where: { id },
                data: {
                    matches: updatePlayerStatisticsDto.matches,
                    goals: updatePlayerStatisticsDto.goals,
                    assists: updatePlayerStatisticsDto.assists,
                    yellowCards: updatePlayerStatisticsDto.yellowCards,
                    redCards: updatePlayerStatisticsDto.redCards,
                    minutesPlayed: updatePlayerStatisticsDto.minutesPlayed,
                    passAccuracy: updatePlayerStatisticsDto.passAccuracy,
                    shotAccuracy: updatePlayerStatisticsDto.shotAccuracy,
                    tackles: updatePlayerStatisticsDto.tackles,
                    season: updatePlayerStatisticsDto.season
                },
                include: {
                    player: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`إحصائيات اللاعب رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number): Promise<PlayerStatistics> {
        try {
            return await this.prisma.playerStatistics.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`إحصائيات اللاعب رقم ${id} غير موجودة`);
        }
    }

    async updateStats(id: number, stats: Partial<UpdatePlayerStatisticsDto>): Promise<PlayerStatistics> {
        try {
            const currentStats = await this.prisma.playerStatistics.findUnique({
                where: { id }
            });

            if (!currentStats) {
                throw new NotFoundException(`إحصائيات اللاعب رقم ${id} غير موجودة`);
            }

            return await this.prisma.playerStatistics.update({
                where: { id },
                data: {
                    matches: stats.matches ? currentStats.matches + stats.matches : currentStats.matches,
                    goals: stats.goals ? currentStats.goals + stats.goals : currentStats.goals,
                    assists: stats.assists ? currentStats.assists + stats.assists : currentStats.assists,
                    yellowCards: stats.yellowCards ? currentStats.yellowCards + stats.yellowCards : currentStats.yellowCards,
                    redCards: stats.redCards ? currentStats.redCards + stats.redCards : currentStats.redCards,
                    minutesPlayed: stats.minutesPlayed ? currentStats.minutesPlayed + stats.minutesPlayed : currentStats.minutesPlayed,
                    tackles: stats.tackles ? currentStats.tackles + stats.tackles : currentStats.tackles,
                    passAccuracy: stats.passAccuracy || currentStats.passAccuracy,
                    shotAccuracy: stats.shotAccuracy || currentStats.shotAccuracy
                },
                include: {
                    player: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`إحصائيات اللاعب رقم ${id} غير موجودة`);
        }
    }
} 