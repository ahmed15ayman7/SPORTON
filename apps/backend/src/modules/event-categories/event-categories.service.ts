import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EventCategory } from '@prisma/client';

@Injectable()
export class EventCategoriesService extends BaseService<EventCategory> {
    constructor(prisma: PrismaService) {
        super(prisma, 'eventCategory');
    }

    protected getSearchFields(): string[] {
        return ['name', 'description'];
    }

    protected getIncludeFields(): object {
        return {
            events: true,
        };
    }

    async getEventCategoryProfile(id: number): Promise<EventCategory> {
        const category = await this.prisma.eventCategory.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!category) {
            throw new NotFoundException('فئة الفعالية غير موجودة');
        }
        return category;
    }

    async getCategoryEvents(id: number) {
        const category = await this.prisma.eventCategory.findUnique({
            where: { id },
            include: {
                events: true,
            },
        });
        if (!category) {
            throw new NotFoundException('فئة الفعالية غير موجودة');
        }
        return category.events;
    }

    async getCategoryByName(name: string): Promise<EventCategory> {
        const category = await this.prisma.eventCategory.findFirst({
            where: { name },
            include: this.getIncludeFields(),
        });
        if (!category) {
            throw new NotFoundException('فئة الفعالية غير موجودة');
        }
        return category;
    }
} 