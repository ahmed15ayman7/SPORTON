import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationSettingsDto } from './dto/create-notification-settings.dto';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
import { NotificationSettings } from '@shared/prisma';
@Injectable()
export class NotificationSettingsService {
    constructor(private prisma: PrismaService) { }

    async create(createNotificationSettingsDto: CreateNotificationSettingsDto): Promise<NotificationSettings> {
        return this.prisma.notificationSettings.create({
            data: {
                user: { connect: { id: createNotificationSettingsDto.userId } },
                emailEnabled: createNotificationSettingsDto.emailEnabled,
                pushEnabled: createNotificationSettingsDto.pushEnabled,
                smsEnabled: createNotificationSettingsDto.smsEnabled,
                messageNotifications: createNotificationSettingsDto.messageNotifications,
                transferNotifications: createNotificationSettingsDto.transferNotifications,
                matchNotifications: createNotificationSettingsDto.matchNotifications,
                trainingNotifications: createNotificationSettingsDto.trainingNotifications,
                newsNotifications: createNotificationSettingsDto.newsNotifications,
                contractNotifications: createNotificationSettingsDto.contractNotifications,
                quietHoursStart: createNotificationSettingsDto.quietHoursStart,
                quietHoursEnd: createNotificationSettingsDto.quietHoursEnd,
                timezone: createNotificationSettingsDto.timezone,
            },
            include: {
                user: true,
            },
        });
    }

    async findAll(): Promise<NotificationSettings[]> {
        return this.prisma.notificationSettings.findMany({
            include: {
                user: true,
            },
        });
    }

    async findOne(id: number): Promise<NotificationSettings> {
        const settings = await this.prisma.notificationSettings.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!settings) {
            throw new NotFoundException(`إعدادات الإشعارات رقم ${id} غير موجودة`);
        }

        return settings;
    }

    async findByUser(userId: number): Promise<NotificationSettings> {
        const settings = await this.prisma.notificationSettings.findUnique({
            where: { userId },
            include: {
                user: true,
            },
        });

        if (!settings) {
            throw new NotFoundException(`إعدادات الإشعارات للمستخدم رقم ${userId} غير موجودة`);
        }

        return settings;
    }

    async update(id: number, updateNotificationSettingsDto: UpdateNotificationSettingsDto): Promise<NotificationSettings> {
        try {
            return await this.prisma.notificationSettings.update({
                where: { id },
                data: updateNotificationSettingsDto,
                include: {
                    user: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`إعدادات الإشعارات رقم ${id} غير موجودة`);
        }
    }

    async updateByUser(userId: number, updateNotificationSettingsDto: UpdateNotificationSettingsDto): Promise<NotificationSettings> {
        try {
            return await this.prisma.notificationSettings.update({
                where: { userId },
                data: updateNotificationSettingsDto,
                include: {
                    user: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`إعدادات الإشعارات للمستخدم رقم ${userId} غير موجودة`);
        }
    }

    async remove(id: number): Promise<NotificationSettings> {
        try {
            return await this.prisma.notificationSettings.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`إعدادات الإشعارات رقم ${id} غير موجودة`);
        }
    }
} 