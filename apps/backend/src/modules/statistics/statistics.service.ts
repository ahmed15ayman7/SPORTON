import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Statistic } from '@prisma/client';

@Injectable()
export class StatisticsService extends BaseService<Statistic> {
    constructor(prisma: PrismaService) {
        super(prisma, 'statistic');
    }

    protected getSearchFields(): string[] {
        return [];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getStatisticProfile(id: number): Promise<Statistic> {
        const statistic = await this.prisma.statistic.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!statistic) {
            throw new NotFoundException('الإحصائية غير موجودة');
        }
        return statistic;
    }

    async getUserStatistic(userId: number): Promise<Statistic> {
        const statistic = await this.prisma.statistic.findUnique({
            where: { userId },
            include: this.getIncludeFields(),
        });
        if (!statistic) {
            throw new NotFoundException('إحصائيات المستخدم غير موجودة');
        }
        return statistic;
    }

    async updateUserStatistic(userId: number, data: Partial<Statistic>): Promise<Statistic> {
        const statistic = await this.prisma.statistic.update({
            where: { userId },
            data,
            include: this.getIncludeFields(),
        });
        return statistic;
    }
} 