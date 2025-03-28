import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationSettingsDto } from './dto/create-notification-settings.dto';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';

@Injectable()
export class NotificationSettingsService {
    constructor(private prisma: PrismaService) { }

    async create(createNotificationSettingsDto: CreateNotificationSettingsDto) {
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

    async findAll() {
        return this.prisma.notificationSettings.findMany({
            include: {
                user: true,
            },
        });
    }

    async findOne(id: number) {
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

    async findByUser(userId: number) {
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

    async update(id: number, updateNotificationSettingsDto: UpdateNotificationSettingsDto) {
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

    async updateByUser(userId: number, updateNotificationSettingsDto: UpdateNotificationSettingsDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.notificationSettings.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`إعدادات الإشعارات رقم ${id} غير موجودة`);
        }
    }
} 