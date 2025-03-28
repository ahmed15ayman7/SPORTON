import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlayerStatisticsDto } from './dto/create-player-statistics.dto';
import { UpdatePlayerStatisticsDto } from './dto/update-player-statistics.dto';

@Injectable()
export class PlayerStatisticsService {
    constructor(private prisma: PrismaService) { }

    async create(createPlayerStatisticsDto: CreatePlayerStatisticsDto) {
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

    async findAll() {
        return this.prisma.playerStatistics.findMany({
            include: {
                player: true
            }
        });
    }

    async findOne(id: number) {
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

    async findByPlayer(playerId: number) {
        return this.prisma.playerStatistics.findMany({
            where: { playerId },
            include: {
                player: true
            }
        });
    }

    async findBySeason(season: string) {
        return this.prisma.playerStatistics.findMany({
            where: { season },
            include: {
                player: true
            }
        });
    }

    async update(id: number, updatePlayerStatisticsDto: UpdatePlayerStatisticsDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.playerStatistics.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`إحصائيات اللاعب رقم ${id} غير موجودة`);
        }
    }

    async updateStats(id: number, stats: Partial<UpdatePlayerStatisticsDto>) {
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