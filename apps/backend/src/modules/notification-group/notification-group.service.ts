import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationGroupDto } from './dto/create-notification-group.dto';
import { UpdateNotificationGroupDto } from './dto/update-notification-group.dto';
import { NotificationGroup } from '@prisma/client';
@Injectable()
export class NotificationGroupService {
    constructor(private prisma: PrismaService) { }

    async create(createNotificationGroupDto: CreateNotificationGroupDto): Promise<NotificationGroup> {
        return this.prisma.notificationGroup.create({
            data: {
                name: createNotificationGroupDto.name,
                description: createNotificationGroupDto.description,
                notifications: {
                    connect: createNotificationGroupDto.notificationIds.map(id => ({ id }))
                }
            },
            include: {
                notifications: true
            }
        });
    }

    async findAll(): Promise<NotificationGroup[]> {
        return this.prisma.notificationGroup.findMany({
            include: {
                notifications: true
            }
        });
    }

    async findOne(id: number): Promise<NotificationGroup> {
        const group = await this.prisma.notificationGroup.findUnique({
            where: { id },
            include: {
                notifications: true
            }
        });

        if (!group) {
            throw new NotFoundException(`مجموعة الإشعارات رقم ${id} غير موجودة`);
        }

        return group;
    }

    async update(id: number, updateNotificationGroupDto: UpdateNotificationGroupDto): Promise<NotificationGroup> {
        try {
            return await this.prisma.notificationGroup.update({
                where: { id },
                data: {
                    name: updateNotificationGroupDto.name,
                    description: updateNotificationGroupDto.description,
                    notifications: updateNotificationGroupDto.notificationIds ? {
                        set: updateNotificationGroupDto.notificationIds.map(id => ({ id }))
                    } : undefined
                },
                include: {
                    notifications: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`مجموعة الإشعارات رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number): Promise<NotificationGroup> {
        try {
            return await this.prisma.notificationGroup.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`مجموعة الإشعارات رقم ${id} غير موجودة`);
        }
    }

    async addNotification(id: number, notificationId: number): Promise<NotificationGroup> {
        try {
            return await this.prisma.notificationGroup.update({
                where: { id },
                data: {
                    notifications: {
                        connect: { id: notificationId }
                    }
                },
                include: {
                    notifications: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`مجموعة الإشعارات رقم ${id} غير موجودة`);
        }
    }

    async removeNotification(id: number, notificationId: number): Promise<NotificationGroup> {
        try {
            return await this.prisma.notificationGroup.update({
                where: { id },
                data: {
                    notifications: {
                        disconnect: { id: notificationId }
                    }
                },
                include: {
                    notifications: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`مجموعة الإشعارات رقم ${id} غير موجودة`);
        }
    }
}
