import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationActionDto } from '@/dtos/NotificationAction.create.dto';
import { UpdateNotificationActionDto } from '@/dtos/NotificationAction.update.dto';
import { NotificationAction } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class NotificationActionService extends BaseService<NotificationAction> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'notificationAction');
    }

    async create(createNotificationActionDto: CreateNotificationActionDto): Promise<NotificationAction> {
        return this.prisma.notificationAction.create({
            data: {
                notificationId: createNotificationActionDto.notificationId,
                actionType: createNotificationActionDto.actionType,
                actionUrl: createNotificationActionDto.actionUrl,
                buttonText: createNotificationActionDto.buttonText
            },
            include: {
                notification: true
            }
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<NotificationAction>> {
        const { take, skip } = params;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.notificationAction.findMany({
                include: {
                    notification: true
                },
                skip,
                take
            }),
            this.prisma.notificationAction.count()
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

    async findOne(id: number): Promise<NotificationAction> {
        const action = await this.prisma.notificationAction.findUnique({
            where: { id },
            include: {
                notification: true
            }
        });

        if (!action) {
            throw new NotFoundException(`إجراء الإشعار رقم ${id} غير موجود`);
        }

        return action;
    }

    async findByNotification(notificationId: number): Promise<NotificationAction> {
        const action = await this.prisma.notificationAction.findUnique({
            where: { notificationId },
            include: {
                notification: true
            }
        });

        if (!action) {
            throw new NotFoundException(`إجراء الإشعار رقم ${notificationId} غير موجود`);
        }

        return action;
    }

    async update(id: number, updateNotificationActionDto: UpdateNotificationActionDto): Promise<NotificationAction> {
        try {
            return await this.prisma.notificationAction.update({
                where: { id },
                data: {
                    actionType: updateNotificationActionDto.actionType,
                    actionUrl: updateNotificationActionDto.actionUrl,
                    buttonText: updateNotificationActionDto.buttonText
                },
                include: {
                    notification: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`إجراء الإشعار رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<NotificationAction> {
        try {
            return await this.prisma.notificationAction.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`إجراء الإشعار رقم ${id} غير موجود`);
        }
    }

    async complete(id: number): Promise<NotificationAction> {
        try {
            return await this.prisma.notificationAction.update({
                where: { id },
                data: {
                    completed: true,
                    completedAt: new Date()
                },
                include: {
                    notification: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`إجراء الإشعار رقم ${id} غير موجود`);
        }
    }
} 