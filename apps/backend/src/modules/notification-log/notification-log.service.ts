import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';
import { NotificationLog, DeliveryStatus, NotificationChannel } from '@shared/prisma';
@Injectable()
export class NotificationLogService {
    constructor(private prisma: PrismaService) { }

    async create(createNotificationLogDto: CreateNotificationLogDto): Promise<NotificationLog> {
        return this.prisma.notificationLog.create({
            data: {
                notification: { connect: { id: createNotificationLogDto.notificationId } },
                status: createNotificationLogDto.status,
                channel: createNotificationLogDto.channel,
                attempts: createNotificationLogDto.attempts || 0,
                error: createNotificationLogDto.error,
            },
            include: {
                notification: true,
            },
        });
    }

    async findAll(): Promise<NotificationLog[]> {
        return this.prisma.notificationLog.findMany({
            include: {
                notification: true,
            },
        });
    }

    async findOne(id: number): Promise<NotificationLog> {
        const log = await this.prisma.notificationLog.findUnique({
            where: { id },
            include: {
                notification: true,
            },
        });

        if (!log) {
            throw new NotFoundException(`سجل الإشعارات رقم ${id} غير موجود`);
        }

        return log;
    }

    async findByNotification(notificationId: number): Promise<NotificationLog[]> {
        return this.prisma.notificationLog.findMany({
            where: { notificationId },
            include: {
                notification: true,
            },
        });
    }

    async findByStatus(status: string): Promise<NotificationLog[]> {
        return this.prisma.notificationLog.findMany({
            where: { status: status as DeliveryStatus },
            include: {
                notification: true,
            },
        });
    }

    async findByChannel(channel: string): Promise<NotificationLog[]> {
        return this.prisma.notificationLog.findMany({
            where: { channel: channel as NotificationChannel },
            include: {
                notification: true,
            },
        });
    }

    async update(id: number, updateNotificationLogDto: UpdateNotificationLogDto): Promise<NotificationLog> {
        try {
            return await this.prisma.notificationLog.update({
                where: { id },
                data: updateNotificationLogDto,
                include: {
                    notification: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`سجل الإشعارات رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<NotificationLog> {
        try {
            return await this.prisma.notificationLog.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`سجل الإشعارات رقم ${id} غير موجود`);
        }
    }

    async incrementAttempts(id: number): Promise<NotificationLog> {
        try {
            const log = await this.prisma.notificationLog.findUnique({
                where: { id },
            });

            if (!log) {
                throw new NotFoundException(`سجل الإشعارات رقم ${id} غير موجود`);
            }

            return await this.prisma.notificationLog.update({
                where: { id },
                data: {
                    attempts: log.attempts + 1,
                },
                include: {
                    notification: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`سجل الإشعارات رقم ${id} غير موجود`);
        }
    }
} 