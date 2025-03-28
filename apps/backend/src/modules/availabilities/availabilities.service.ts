import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Availability } from '@prisma/client';

@Injectable()
export class AvailabilitiesService extends BaseService<Availability> {
    constructor(prisma: PrismaService) {
        super(prisma, 'availability');
    }

    protected getSearchFields(): string[] {
        return ['status', 'notes'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
        };
    }

    async getAvailabilityProfile(id: number): Promise<Availability> {
        const availability = await this.prisma.availability.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!availability) {
            throw new NotFoundException('التوفر غير موجود');
        }
        return availability;
    }

    async getUserAvailability(userId: number): Promise<Availability> {
        const availability = await this.prisma.availability.findUnique({
            where: { userId },
            include: this.getIncludeFields(),
        });
        if (!availability) {
            throw new NotFoundException('لم يتم العثور على توفر للمستخدم');
        }
        return availability;
    }

    async getAvailableUsers(): Promise<Availability[]> {
        const availabilities = await this.prisma.availability.findMany({
            where: { status: 'AVAILABLE' },
            include: this.getIncludeFields(),
        });
        return availabilities;
    }

    async getUsersByStatus(status: string): Promise<Availability[]> {
        const availabilities = await this.prisma.availability.findMany({
            where: { status },
            include: this.getIncludeFields(),
        });
        return availabilities;
    }
} 