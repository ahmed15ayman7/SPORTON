import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Notification, NotificationType } from '@prisma/client';

@Injectable()
export class NotificationService extends BaseService<Notification> {
    constructor(prisma: PrismaService) {
        super(prisma, 'notification');
    }

    protected getSearchFields(): string[] {
        return ['title', 'content'];
    }

    protected getIncludeFields(): any {
        return {
            user: true,
        };
    }

    async getNotificationProfile(id: number): Promise<Notification> {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!notification) {
            throw new NotFoundException('الإشعار غير موجود');
        }
        return notification;
    }

    async getUserNotifications(userId: number): Promise<Notification[]> {
        return this.prisma.notification.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async getUnreadNotifications(userId: number): Promise<Notification[]> {
        return this.prisma.notification.findMany({
            where: {
                userId,
                isRead: false,
            },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async getReadNotifications(userId: number): Promise<Notification[]> {
        return this.prisma.notification.findMany({
            where: {
                userId,
                isRead: true,
            },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async markAsRead(id: number): Promise<Notification> {
        const notification = await this.getNotificationProfile(id);
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }

    async markAllAsRead(userId: number): Promise<Notification[]> {
        await this.prisma.notification.updateMany({
            where: {
                userId,
                isRead: false,
            },
            data: { isRead: true },
        });
        return this.getUserNotifications(userId);
    }

    async getNotificationsByType(userId: number, type: string): Promise<Notification[]> {
        return this.prisma.notification.findMany({
            where: {
                userId,
                type: type as NotificationType,
            },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async deleteNotification(id: number): Promise<Notification> {
        const notification = await this.getNotificationProfile(id);
        return this.prisma.notification.delete({
            where: { id },
        });
    }

    async deleteAllNotifications(userId: number): Promise<Notification[]> {
        await this.prisma.notification.deleteMany({
            where: { userId },
        });
        return [];
    }
} 