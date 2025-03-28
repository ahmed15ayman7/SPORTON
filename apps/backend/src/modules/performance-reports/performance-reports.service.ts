import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PerformanceReport } from '@prisma/client';

@Injectable()
export class PerformanceReportsService extends BaseService<PerformanceReport> {
    constructor(prisma: PrismaService) {
        super(prisma, 'performanceReport');
    }

    protected getSearchFields(): string[] {
        return ['analysis', 'recommendations'];
    }

    protected getIncludeFields(): object {
        return {
            athlete: true,
            coach: true,
        };
    }

    async getPerformanceReportProfile(id: number): Promise<PerformanceReport> {
        const report = await this.prisma.performanceReport.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!report) {
            throw new NotFoundException('التقرير غير موجود');
        }
        return report;
    }

    async getAthleteReports(athleteId: number) {
        const reports = await this.prisma.performanceReport.findMany({
            where: { athleteId },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return reports;
    }

    async getCoachReports(coachId: number) {
        const reports = await this.prisma.performanceReport.findMany({
            where: { coachId },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return reports;
    }

    async getReportsByDateRange(startDate: Date, endDate: Date) {
        const reports = await this.prisma.performanceReport.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return reports;
    }

    async getLatestReport(athleteId: number) {
        const report = await this.prisma.performanceReport.findFirst({
            where: { athleteId },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return report;
    }

    async getAthleteProgress(athleteId: number) {
        const reports = await this.prisma.performanceReport.findMany({
            where: { athleteId },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'asc',
            },
        });
        return reports;
    }
} 