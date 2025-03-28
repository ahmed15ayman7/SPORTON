import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationActionDto } from './dto/create-notification-action.dto';
import { UpdateNotificationActionDto } from './dto/update-notification-action.dto';

@Injectable()
export class NotificationActionService {
    constructor(private prisma: PrismaService) { }

    async create(createNotificationActionDto: CreateNotificationActionDto) {
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

    async findAll() {
        return this.prisma.notificationAction.findMany({
            include: {
                notification: true
            }
        });
    }

    async findOne(id: number) {
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

    async findByNotification(notificationId: number) {
        return this.prisma.notificationAction.findUnique({
            where: { notificationId },
            include: {
                notification: true
            }
        });
    }

    async update(id: number, updateNotificationActionDto: UpdateNotificationActionDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.notificationAction.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`إجراء الإشعار رقم ${id} غير موجود`);
        }
    }

    async complete(id: number) {
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