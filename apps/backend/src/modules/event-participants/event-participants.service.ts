import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EventParticipant } from '@shared/prisma';

@Injectable()
export class EventParticipantsService extends BaseService<EventParticipant> {
    constructor(prisma: PrismaService) {
        super(prisma, 'eventParticipant');
    }

    protected getSearchFields(): string[] {
        return ['status'];
    }

    protected getIncludeFields(): object {
        return {
            event: true,
            user: true,
        };
    }

    async getEventParticipantProfile(id: number): Promise<EventParticipant> {
        const participant = await this.prisma.eventParticipant.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!participant) {
            throw new NotFoundException('المشارك غير موجود');
        }
        return participant;
    }

    async getEventParticipants(eventId: number): Promise<EventParticipant[]> {
        const participants = await this.prisma.eventParticipant.findMany({
            where: { eventId },
            include: this.getIncludeFields(),
            orderBy: {
                registeredAt: 'desc',
            },
        });
        return participants;
    }

    async getUserParticipations(userId: number): Promise<EventParticipant[]> {
        const participations = await this.prisma.eventParticipant.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: {
                registeredAt: 'desc',
            },
        });
        return participations;
    }

    async getParticipantsByStatus(eventId: number, status: string): Promise<EventParticipant[]> {
        const participants = await this.prisma.eventParticipant.findMany({
            where: {
                eventId,
                status: status as any,
            },
            include: this.getIncludeFields(),
            orderBy: {
                registeredAt: 'desc',
            },
        });
        return participants;
    }

    async updateParticipationStatus(id: number, status: string): Promise<EventParticipant> {
        return this.prisma.eventParticipant.update({
            where: { id },
            data: {
                status: status as any,
            },
            include: this.getIncludeFields(),
        });
    }
} 