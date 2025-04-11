import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationLogDto } from '@/dtos/NotificationLog.create.dto';
import { UpdateNotificationLogDto } from '@/dtos/NotificationLog.update.dto';
import { NotificationLog, DeliveryStatus, NotificationChannel } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class NotificationLogService extends BaseService<NotificationLog> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'notificationLog');
    }

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

    async findAll(params: PaginationDto): Promise<PaginatedResponse<NotificationLog>> {
        const { take, skip } = params;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.notificationLog.findMany({
                include: {
                    notification: true,
                },
                skip,
                take
            }),
            this.prisma.notificationLog.count()
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