import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompaniesService extends BaseService<Company> {
    constructor(prisma: PrismaService) {
        super(prisma, 'company');
    }

    protected getSearchFields(): string[] {
        return ['registrationNo', 'website'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
            products: true,
            sponsorships: true,
            jobs: true,
            performanceReports: true,
            performanceReportCoaches: true,
            subscriptions: true,
            payments: true,
            reports: true,
            reported: true,
            competitionParticipants: true,
            userBehaviors: true,
            trainingReviews: true,
            userSegments: true,
            productReviews: true,
            orders: true,
            addresses: true,
            receivedEndorsements: true,
            athleteMetrics: true,
            articles: true,
            advertisements: true,
            events: true,
            eventParticipants: true,
            professionalAchievements: true,
            socialMedia: true,
            notificationSettings: true,
            notifications: true,
        };
    }

    async getCompanyProfile(id: number): Promise<Company> {
        const company = await this.prisma.company.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!company) {
            throw new NotFoundException('الشركة غير موجودة');
        }
        return company;
    }

    async getCompanyProducts(id: number): Promise<any[]> {
        const company = await this.prisma.company.findUnique({
            where: { id },
            include: {
                products: true,
            },
        });
        if (!company) {
            throw new NotFoundException('الشركة غير موجودة');
        }
        return company.products;
    }

    async getCompanySponsorships(id: number): Promise<any[]> {
        const company = await this.prisma.company.findUnique({
            where: { id },
            include: {
                sponsorships: true,
            },
        });
        if (!company) {
            throw new NotFoundException('الشركة غير موجودة');
        }
        return company.sponsorships;
    }

    async getCompanyJobs(id: number): Promise<any[]> {
        const company = await this.prisma.company.findUnique({
            where: { id },
            include: {
                jobs: true,
            },
        });
        if (!company) {
            throw new NotFoundException('الشركة غير موجودة');
        }
        return company.jobs;
    }
} 