import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Job } from '@prisma/client';

@Injectable()
export class JobsService extends BaseService<Job> {
    constructor(prisma: PrismaService) {
        super(prisma, 'job');
    }

    protected getSearchFields(): string[] {
        return ['title', 'description'];
    }

    protected getIncludeFields(): object {
        return {
            company: true,
            applications: {
                include: {
                    applicant: true,
                },
            },
        };
    }

    async getJobProfile(id: number): Promise<Job> {
        const job = await this.prisma.job.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!job) {
            throw new NotFoundException('الوظيفة غير موجودة');
        }
        return job;
    }

    async getCompanyJobs(companyId: number): Promise<Job[]> {
        const jobs = await this.prisma.job.findMany({
            where: { companyId },
            include: this.getIncludeFields(),
        });
        return jobs;
    }
} 