import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScoutingReportDto } from './dto/create-scouting-report.dto';
import { UpdateScoutingReportDto } from './dto/update-scouting-report.dto';

@Injectable()
export class ScoutingReportService {
    constructor(private prisma: PrismaService) { }

    async create(createScoutingReportDto: CreateScoutingReportDto) {
        return this.prisma.scoutingReport.create({
            data: createScoutingReportDto,
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async findAll() {
        return this.prisma.scoutingReport.findMany({
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async findOne(id: number) {
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

    async findByScout(scoutId: number) {
        return this.prisma.scoutingReport.findMany({
            where: { scoutId },
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async findByPlayer(playerId: number) {
        return this.prisma.scoutingReport.findMany({
            where: { playerId },
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async findByMatch(matchId: number) {
        return this.prisma.scoutingReport.findMany({
            where: { matchId },
            include: {
                scout: true,
                player: true,
                match: true,
            },
        });
    }

    async update(id: number, updateScoutingReportDto: UpdateScoutingReportDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.scoutingReport.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`تقرير الكشافة رقم ${id} غير موجود`);
        }
    }
} 