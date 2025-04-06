import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Report, ReportStatus, ReportType } from '@shared/prisma';

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

    async getUserReports(userId: number): Promise<Report[]> {
        const reports = await this.prisma.report.findMany({
            where: { reporterId: userId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async getReportsAgainstUser(userId: number): Promise<Report[]> {
        const reports = await this.prisma.report.findMany({
            where: { reportedId: userId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async getReportsByType(type: string): Promise<Report[]> {
        const reports = await this.prisma.report.findMany({
            where: { type: type as ReportType },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async getReportsByStatus(status: string): Promise<Report[]> {
        const reports = await this.prisma.report.findMany({
            where: { status: status as ReportStatus },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reports;
    }

    async updateReportStatus(id: number, status: string): Promise<Report> {
        return this.prisma.report.update({
            where: { id },
            data: { status: status as ReportStatus },
            include: this.getIncludeFields(),
        });
    }

    // async getReportStatistics(): Promise<ReportStatistics> {
    //     const reports = await this.prisma.report.findMany({
    //         include: this.getIncludeFields(),
    //     });

    //     const totalReports = reports.length;
    //     const reportsByType = reports.reduce((acc, report) => {
    //         acc[report.type] = (acc[report.type] || 0) + 1;
    //         return acc;
    //     }, {});

    //     const reportsByStatus = reports.reduce((acc, report) => {
    //         acc[report.status] = (acc[report.status] || 0) + 1;
    //         return acc;
    //     }, {});

    //     return {
    //         totalReports,
    //         reportsByType,
    //         reportsByStatus,
    //     };
    // }
} 