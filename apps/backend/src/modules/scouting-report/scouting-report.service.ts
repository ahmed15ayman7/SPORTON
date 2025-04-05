import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScoutingReportDto } from './dto/create-scouting-report.dto';
import { UpdateScoutingReportDto } from './dto/update-scouting-report.dto';
import { BaseService } from '../../common/services/base.service';
import { ScoutingReport, Prisma } from '@prisma/client';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
@Injectable()
export class ScoutingReportService extends BaseService<ScoutingReport> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'scoutingReport');
    }

    async create(createScoutingReportDto: CreateScoutingReportDto): Promise<ScoutingReport> {
        return this.prisma.scoutingReport.create({
            data: createScoutingReportDto,
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<ScoutingReport>> {
        const { take, skip, search } = params;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.scoutingReport.findMany({
                include: {
                    scout: true,
                    player: true,
                    match: true,
                },
                skip,
                take,
            }),
            this.prisma.scoutingReport.count({}),
        ]);
        return { data, meta: { total, skip: skip || 0, take: take || 10, hasMore: (skip || 0) + (take || 10) < total } };
    }


    async findOne(id: number): Promise<ScoutingReport> {
        const report = await this.prisma.scoutingReport.findUnique({
            where: { id },
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });

        if (!report) {
            throw new NotFoundException(`تقرير الكشافة رقم ${id} غير موجود`);
        }

        return report;
    }

    async findByScout(scoutId: number): Promise<ScoutingReport[]> {
        return this.prisma.scoutingReport.findMany({
            where: { scoutId },
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async findByPlayer(playerId: number): Promise<ScoutingReport[]> {
        return this.prisma.scoutingReport.findMany({
            where: { playerId },
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async findByMatch(matchId: number): Promise<ScoutingReport[]> {
        return this.prisma.scoutingReport.findMany({
            where: { matchId },
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async update(id: number, updateScoutingReportDto: UpdateScoutingReportDto): Promise<ScoutingReport> {
        try {
            return await this.prisma.scoutingReport.update({
                where: { id },
                data: updateScoutingReportDto,
                include: {
                    scout: true,
                    player: true,
                    match: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`تقرير الكشافة رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<ScoutingReport> {
        try {
            return await this.prisma.scoutingReport.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`تقرير الكشافة رقم ${id} غير موجود`);
        }
    }
} 