import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { JobApplication } from '@prisma/client';

@Injectable()
export class JobApplicationsService extends BaseService<JobApplication> {
    constructor(prisma: PrismaService) {
        super(prisma, 'jobApplication');
    }

    protected getSearchFields(): string[] {
        return ['status'];
    }

    protected getIncludeFields(): object {
        return {
            job: true,
            applicant: true,
        };
    }

    async getJobApplicationProfile(id: number): Promise<JobApplication> {
        const application = await this.prisma.jobApplication.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!application) {
            throw new NotFoundException('طلب الوظيفة غير موجود');
        }
        return application;
    }

    async getJobApplications(jobId: number): Promise<JobApplication[]> {
        const applications = await this.prisma.jobApplication.findMany({
            where: { jobId },
            include: this.getIncludeFields(),
        });
        return applications;
    }

    async getUserApplications(applicantId: number): Promise<JobApplication[]> {
        const applications = await this.prisma.jobApplication.findMany({
            where: { applicantId },
            include: this.getIncludeFields(),
        });
        return applications;
    }
} 