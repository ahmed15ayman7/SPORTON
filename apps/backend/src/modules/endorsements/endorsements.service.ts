import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Endorsement } from '@prisma/client';

@Injectable()
export class EndorsementsService extends BaseService<Endorsement> {
    constructor(prisma: PrismaService) {
        super(prisma, 'endorsement');
    }

    protected getSearchFields(): string[] {
        return ['skill'];
    }

    protected getIncludeFields(): object {
        return {
            endorser: true,
            recipient: true,
        };
    }

    async getEndorsementProfile(id: number): Promise<Endorsement> {
        const endorsement = await this.prisma.endorsement.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!endorsement) {
            throw new NotFoundException('التزكية غير موجودة');
        }
        return endorsement;
    }

    async getUserEndorsements(userId: number): Promise<Endorsement[]> {
        const endorsements = await this.prisma.endorsement.findMany({
            where: { recipientId: userId },
            include: this.getIncludeFields(),
        });
        return endorsements;
    }

    async getUserGivenEndorsements(userId: number): Promise<Endorsement[]> {
        const endorsements = await this.prisma.endorsement.findMany({
            where: { endorserId: userId },
            include: this.getIncludeFields(),
        });
        return endorsements;
    }

    async getSkillEndorsements(skill: string): Promise<Endorsement[]> {
        const endorsements = await this.prisma.endorsement.findMany({
            where: { skill },
            include: this.getIncludeFields(),
        });
        return endorsements;
    }
} 