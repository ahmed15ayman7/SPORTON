import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Experience } from '@shared/prisma';

@Injectable()
export class ExperiencesService extends BaseService<Experience> {
    constructor(prisma: PrismaService) {
        super(prisma, 'experience');
    }

    protected getSearchFields(): string[] {
        return ['title', 'organization', 'description', 'achievements'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getExperienceProfile(id: number): Promise<Experience> {
        const experience = await this.prisma.experience.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!experience) {
            throw new NotFoundException('الخبرة غير موجودة');
        }
        return experience;
    }

    async getUserExperiences(userId: number): Promise<Experience[]> {
        const experiences = await this.prisma.experience.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return experiences;
    }

    async getCurrentExperiences(userId: number): Promise<Experience[]> {
        const experiences = await this.prisma.experience.findMany({
            where: {
                userId,
                current: true
            },
            include: this.getIncludeFields(),
        });
        return experiences;
    }
} 