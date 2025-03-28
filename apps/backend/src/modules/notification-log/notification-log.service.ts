import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';

@Injectable()
export class NotificationLogService {
    constructor(private prisma: PrismaService) { }

    async create(createNotificationLogDto: CreateNotificationLogDto) {
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

    async findAll() {
        return this.prisma.notificationLog.findMany({
            include: {
                notification: true,
            },
        });
    }

    async findOne(id: number) {
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

    async findByNotification(notificationId: number) {
        return this.prisma.notificationLog.findMany({
            where: { notificationId },
            include: {
                notification: true,
            },
        });
    }

    async findByStatus(status: string) {
        return this.prisma.notificationLog.findMany({
            where: { status },
            include: {
                notification: true,
            },
        });
    }

    async findByChannel(channel: string) {
        return this.prisma.notificationLog.findMany({
            where: { channel },
            include: {
                notification: true,
            },
        });
    }

    async update(id: number, updateNotificationLogDto: UpdateNotificationLogDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.notificationLog.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`سجل الإشعارات رقم ${id} غير موجود`);
        }
    }

    async incrementAttempts(id: number) {
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