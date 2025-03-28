import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Report } from '@prisma/client';

@Injectable()
export class ReportsService extends BaseService<Report> {
    constructor(prisma: PrismaService) {
        super(prisma, 'report');
    }

    protected getSearchFields(): string[] {
        return ['description'];
    }

    protected getIncludeFields(): object {
        return {
            reporter: true,
            reported: true,
        };
    }

    async getReportProfile(id: number): Promise<Report> {
        const report = await this.prisma.report.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!report) {
            throw new NotFoundException('التقرير غير موجود');
        }
        return report;
    }

    async getUserReports(userId: number) {
        const reports = await this.prisma.report.findMany({
            where: { reporterId: userId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async getReportsAgainstUser(userId: number) {
        const reports = await this.prisma.report.findMany({
            where: { reportedId: userId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async getReportsByType(type: string) {
        const reports = await this.prisma.report.findMany({
            where: { type },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async getReportsByStatus(status: string) {
        const reports = await this.prisma.report.findMany({
            where: { status },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async updateReportStatus(id: number, status: string) {
        return this.prisma.report.update({
            where: { id },
            data: { status },
            include: this.getIncludeFields(),
        });
    }

    async getReportStatistics() {
        const reports = await this.prisma.report.findMany({
            include: this.getIncludeFields(),
        });

        const totalReports = reports.length;
        const reportsByType = reports.reduce((acc, report) => {
            acc[report.type] = (acc[report.type] || 0) + 1;
            return acc;
        }, {});

        const reportsByStatus = reports.reduce((acc, report) => {
            acc[report.status] = (acc[report.status] || 0) + 1;
            return acc;
        }, {});

        return {
            totalReports,
            reportsByType,
            reportsByStatus,
        };
    }
} 