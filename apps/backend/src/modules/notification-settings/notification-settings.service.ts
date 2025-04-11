import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationSettingsDto } from '@/dtos/NotificationSettings.create.dto';
import { UpdateNotificationSettingsDto } from '@/dtos/NotificationSettings.update.dto';
import { NotificationSettings } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class NotificationSettingsService extends BaseService<NotificationSettings> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'notificationSettings');
    }

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

    async findAll(params: PaginationDto): Promise<PaginatedResponse<NotificationSettings>> {
        const { take, skip } = params;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.notificationSettings.findMany({
                include: {
                    user: true,
                },
                skip,
                take
            }),
            this.prisma.notificationSettings.count()
        ]);
        return {
            data,
            meta: {
                total,
                skip: skip || 0,
                take: take || 10,
                hasMore: total > (skip || 0) + (take || 10)
            }
        };
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