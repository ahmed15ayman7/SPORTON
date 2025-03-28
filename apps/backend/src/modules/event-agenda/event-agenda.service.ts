import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EventAgenda } from '@prisma/client';

@Injectable()
export class EventAgendaService extends BaseService<EventAgenda> {
    constructor(prisma: PrismaService) {
        super(prisma, 'eventAgenda');
    }

    protected getSearchFields(): string[] {
        return ['title', 'location', 'speaker'];
    }

    protected getIncludeFields(): object {
        return {
            event: true,
        };
    }

    async getEventAgendaProfile(id: number): Promise<EventAgenda> {
        const agenda = await this.prisma.eventAgenda.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!agenda) {
            throw new NotFoundException('نشاط الفعالية غير موجود');
        }
        return agenda;
    }

    async getEventAgenda(eventId: number) {
        const agenda = await this.prisma.eventAgenda.findMany({
            where: { eventId },
            include: this.getIncludeFields(),
            orderBy: {
                startTime: 'asc',
            },
        });
        return agenda;
    }

    async getUpcomingAgenda(eventId: number) {
        const now = new Date();
        const agenda = await this.prisma.eventAgenda.findMany({
            where: {
                eventId,
                startTime: {
                    gt: now,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                startTime: 'asc',
            },
        });
        return agenda;
    }

    async getCurrentAgenda(eventId: number) {
        const now = new Date();
        const agenda = await this.prisma.eventAgenda.findFirst({
            where: {
                eventId,
                startTime: {
                    lte: now,
                },
                endTime: {
                    gte: now,
                },
            },
            include: this.getIncludeFields(),
        });
        return agenda;
    }

    async getPastAgenda(eventId: number) {
        const now = new Date();
        const agenda = await this.prisma.eventAgenda.findMany({
            where: {
                eventId,
                endTime: {
                    lt: now,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                endTime: 'desc',
            },
        });
        return agenda;
    }
} 