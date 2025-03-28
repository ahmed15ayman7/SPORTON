import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Notification, NotificationStatus } from '@prisma/client';

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
                status: NotificationStatus.UNREAD,
            },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async getReadNotifications(userId: number): Promise<Notification[]> {
        return this.prisma.notification.findMany({
            where: {
                userId,
                status: NotificationStatus.READ,
            },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async markAsRead(id: number): Promise<Notification> {
        const notification = await this.getNotificationProfile(id);
        return this.prisma.notification.update({
            where: { id },
            data: { status: NotificationStatus.READ },
        });
    }

    async markAllAsRead(userId: number): Promise<Notification[]> {
        await this.prisma.notification.updateMany({
            where: {
                userId,
                status: NotificationStatus.UNREAD,
            },
            data: { status: NotificationStatus.READ },
        });
        return this.getUserNotifications(userId);
    }

    async getNotificationsByType(userId: number, type: string): Promise<Notification[]> {
        return this.prisma.notification.findMany({
            where: {
                userId,
                type,
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