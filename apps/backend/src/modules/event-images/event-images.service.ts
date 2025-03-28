import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { EventImage } from '@prisma/client';

@Injectable()
export class EventImagesService extends BaseService<EventImage> {
    constructor(prisma: PrismaService) {
        super(prisma, 'eventImage');
    }

    protected getSearchFields(): string[] {
        return ['description'];
    }

    protected getIncludeFields(): object {
        return {
            event: true,
        };
    }

    async getEventImageProfile(id: number): Promise<EventImage> {
        const image = await this.prisma.eventImage.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!image) {
            throw new NotFoundException('صورة الفعالية غير موجودة');
        }
        return image;
    }

    async getEventImages(eventId: number) {
        const images = await this.prisma.eventImage.findMany({
            where: { eventId },
            include: this.getIncludeFields(),
            orderBy: {
                isMain: 'desc',
            },
        });
        return images;
    }

    async getMainEventImage(eventId: number): Promise<EventImage> {
        const image = await this.prisma.eventImage.findFirst({
            where: {
                eventId,
                isMain: true,
            },
            include: this.getIncludeFields(),
        });
        if (!image) {
            throw new NotFoundException('الصورة الرئيسية للفعالية غير موجودة');
        }
        return image;
    }

    async setMainImage(eventId: number, imageId: number) {
        // إلغاء تعيين الصورة الرئيسية الحالية
        await this.prisma.eventImage.updateMany({
            where: {
                eventId,
                isMain: true,
            },
            data: {
                isMain: false,
            },
        });

        // تعيين الصورة الجديدة كصورة رئيسية
        return this.prisma.eventImage.update({
            where: { id: imageId },
            data: {
                isMain: true,
            },
            include: this.getIncludeFields(),
        });
    }
} 