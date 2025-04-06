import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationTemplate, NotificationType } from '@shared/prisma';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '@/prisma/prisma.service';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@Injectable()
export class NotificationTemplateService extends BaseService<NotificationTemplate> {
    constructor(prisma: PrismaService) {
        super(prisma, 'notificationTemplate');
    }

    async create(data: NotificationTemplate): Promise<NotificationTemplate> {
        return this.prisma.notificationTemplate.create({ data });
    }
    async findActive(): Promise<NotificationTemplate[]> {
        return this.prisma.notificationTemplate.findMany({ where: { isActive: true } });
    }
    async findByType(type: NotificationType): Promise<NotificationTemplate[]> {
        return this.prisma.notificationTemplate.findMany({ where: { type } });
    }
    async findAll(): Promise<PaginatedResponse<NotificationTemplate>> {
        const [data, total] = await Promise.all([
            this.prisma.notificationTemplate.findMany(),
            this.prisma.notificationTemplate.count(),
        ]);

        return {
            data,
            meta: {
                total,
                skip: 1,
                take: 10,
                hasMore: total > 10,
            },
        };
    }

    async findOne(id: number): Promise<NotificationTemplate> {
        const template = await this.prisma.notificationTemplate.findUnique({ where: { id } });
        if (!template) {
            throw new NotFoundException('Notification template not found');
        }
        return template;
    }
    async findByLanguage(language: string): Promise<NotificationTemplate[]> {
        return this.prisma.notificationTemplate.findMany({ where: { language } });
    }
    async toggleActive(id: number): Promise<NotificationTemplate> {
        const template = await this.findOne(id);
        return this.prisma.notificationTemplate.update({ where: { id }, data: { isActive: !template.isActive } });
    }

    async update(id: number, data: NotificationTemplate): Promise<NotificationTemplate> {
        return this.prisma.notificationTemplate.update({ where: { id }, data });
    }

    async remove(id: number): Promise<NotificationTemplate> {
        return this.prisma.notificationTemplate.delete({ where: { id } });
    }
}
