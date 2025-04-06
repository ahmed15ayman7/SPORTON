import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Education } from '@shared/prisma';

@Injectable()
export class EducationService extends BaseService<Education> {
    constructor(prisma: PrismaService) {
        super(prisma, 'education');
    }

    protected getSearchFields(): string[] {
        return ['institution', 'degree', 'field', 'activities'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getEducationProfile(id: number): Promise<Education> {
        const education = await this.prisma.education.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!education) {
            throw new NotFoundException('التعليم غير موجود');
        }
        return education;
    }

    async getUserEducation(userId: number): Promise<Education[]> {
        const education = await this.prisma.education.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return education;
    }

    async getLatestEducation(userId: number): Promise<Education[]> {
        const education = await this.prisma.education.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: {
                endDate: 'desc',
            },
            take: 1,
        });
        return education;
    }
} 