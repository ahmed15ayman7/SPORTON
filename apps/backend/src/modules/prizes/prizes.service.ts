import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prize } from '@prisma/client';

@Injectable()
export class PrizesService extends BaseService<Prize> {
    constructor(prisma: PrismaService) {
        super(prisma, 'prize');
    }

    protected getSearchFields(): string[] {
        return ['description'];
    }

    protected getIncludeFields(): object {
        return {
            event: true,
            competitions: true,
        };
    }

    async getPrizeProfile(id: number): Promise<Prize> {
        const prize = await this.prisma.prize.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!prize) {
            throw new NotFoundException('الجائزة غير موجودة');
        }
        return prize;
    }

    async getEventPrizes(eventId: number) {
        const prizes = await this.prisma.prize.findMany({
            where: { eventId },
            include: this.getIncludeFields(),
            orderBy: {
                rank: 'asc',
            },
        });
        return prizes;
    }

    async getPrizeByRank(eventId: number, rank: number): Promise<Prize> {
        const prize = await this.prisma.prize.findFirst({
            where: {
                eventId,
                rank,
            },
            include: this.getIncludeFields(),
        });
        if (!prize) {
            throw new NotFoundException('الجائزة غير موجودة');
        }
        return prize;
    }

    async getCompetitionPrizes(competitionId: number) {
        const prizes = await this.prisma.prize.findMany({
            where: {
                competitions: {
                    some: {
                        id: competitionId,
                    },
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                rank: 'asc',
            },
        });
        return prizes;
    }
} 