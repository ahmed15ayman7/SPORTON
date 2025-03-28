import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EventSponsor } from '@prisma/client';

@Injectable()
export class EventSponsorsService extends BaseService<EventSponsor> {
    constructor(prisma: PrismaService) {
        super(prisma, 'eventSponsor');
    }

    protected getSearchFields(): string[] {
        return ['sponsorshipType'];
    }

    protected getIncludeFields(): object {
        return {
            event: true,
            sponsor: true,
        };
    }

    async getEventSponsorProfile(id: number): Promise<EventSponsor> {
        const sponsor = await this.prisma.eventSponsor.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!sponsor) {
            throw new NotFoundException('الراعي غير موجود');
        }
        return sponsor;
    }

    async getEventSponsors(eventId: number) {
        const sponsors = await this.prisma.eventSponsor.findMany({
            where: { eventId },
            include: this.getIncludeFields(),
            orderBy: {
                amount: 'desc',
            },
        });
        return sponsors;
    }

    async getSponsorEvents(sponsorId: number) {
        const events = await this.prisma.eventSponsor.findMany({
            where: { sponsorId },
            include: this.getIncludeFields(),
            orderBy: {
                amount: 'desc',
            },
        });
        return events;
    }

    async getSponsorsByType(eventId: number, sponsorshipType: string) {
        const sponsors = await this.prisma.eventSponsor.findMany({
            where: {
                eventId,
                sponsorshipType,
            },
            include: this.getIncludeFields(),
            orderBy: {
                amount: 'desc',
            },
        });
        return sponsors;
    }

    async getTotalSponsorshipAmount(eventId: number) {
        const result = await this.prisma.eventSponsor.aggregate({
            where: { eventId },
            _sum: {
                amount: true,
            },
        });
        return result._sum.amount || 0;
    }
} 