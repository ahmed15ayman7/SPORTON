import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Skill } from '@shared/prisma';

@Injectable()
export class SkillsService extends BaseService<Skill> {
    constructor(prisma: PrismaService) {
        super(prisma, 'skill');
    }

    protected getSearchFields(): string[] {
        return ['name'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getSkillProfile(id: number): Promise<Skill> {
        const skill = await this.prisma.skill.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!skill) {
            throw new NotFoundException('المهارة غير موجودة');
        }
        return skill;
    }

    async getUserSkills(userId: number): Promise<Skill[]> {
        const skills = await this.prisma.skill.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return skills;
    }
} 