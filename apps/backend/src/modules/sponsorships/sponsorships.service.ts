import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Sponsorship } from '@prisma/client';

@Injectable()
export class SponsorshipsService extends BaseService<Sponsorship> {
    constructor(prisma: PrismaService) {
        super(prisma, 'sponsorship');
    }

    protected getSearchFields(): string[] {
        return ['details'];
    }

    protected getIncludeFields(): object {
        return {
            sponsor: true,
            athlete: true,
        };
    }

    async getSponsorshipProfile(id: number): Promise<Sponsorship> {
        const sponsorship = await this.prisma.sponsorship.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!sponsorship) {
            throw new NotFoundException('الرعاية غير موجودة');
        }
        return sponsorship;
    }

    async getSponsorSponsorships(sponsorId: number): Promise<Sponsorship[]> {
        const sponsorships = await this.prisma.sponsorship.findMany({
            where: { sponsorId },
            include: this.getIncludeFields(),
        });
        return sponsorships;
    }

    async getAthleteSponsorships(athleteId: number): Promise<Sponsorship[]> {
        const sponsorships = await this.prisma.sponsorship.findMany({
            where: { athleteId },
            include: this.getIncludeFields(),
        });
        return sponsorships;
    }
} 