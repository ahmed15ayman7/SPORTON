import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OptimizationLog } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseService } from '@/common/services/base.service';
import { UpdateOptimizationLogDto } from './dto/update-optimization-log.dto';

@Injectable()
export class OptimizationLogService extends BaseService<OptimizationLog> {
    constructor(prisma: PrismaService) {
        super(prisma, 'optimizationLog');
    }
    async findAll(query: PaginationDto): Promise<PaginatedResponse<OptimizationLog>> {
        const { take, skip } = query;
        const logs = await this.prisma.optimizationLog.findMany({
            skip: skip,
            take: take,
        });
        return {
            data: logs,
            meta: {
                total: logs.length,
                take: take || 10,
                skip: skip || 0,
                hasMore: logs.length === take,
            }
        }
    }
    async getLogProfile(id: number): Promise<OptimizationLog> {
        const log = await this.prisma.optimizationLog.findUnique({
            where: { id: id },
        });
        if (!log) {
            throw new NotFoundException('Log not found');
        }
        return log;
    }
    async getLogsByType(type: string): Promise<OptimizationLog[]> {
        return this.prisma.optimizationLog.findMany({
            where: { type: type },
        });
    }
    async getLogsByDateRange(startDate: Date, endDate: Date): Promise<OptimizationLog[]> {
        return this.prisma.optimizationLog.findMany({
            where: { date: { gte: startDate, lte: endDate } },
        });
    }
    async update(id: number, updateOptimizationLogDto: UpdateOptimizationLogDto): Promise<OptimizationLog> {
        return this.prisma.optimizationLog.update({
            where: { id: id },
            data: updateOptimizationLogDto,
        });
    }
    async remove(id: number): Promise<OptimizationLog> {
        return this.prisma.optimizationLog.delete({
            where: { id: id },
        });
    }
}   