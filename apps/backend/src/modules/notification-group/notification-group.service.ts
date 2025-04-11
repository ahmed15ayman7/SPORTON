import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateNotificationGroupDto } from '@/dtos/NotificationGroup.create.dto';
import { UpdateNotificationGroupDto } from '@/dtos/NotificationGroup.update.dto';
import { NotificationGroup } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseService } from '@/common/services/base.service';
@Injectable()
export class NotificationGroupService extends BaseService<NotificationGroup> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'notificationGroup');
    }

    async create(createNotificationGroupDto: CreateNotificationGroupDto & { notifications: number[] }): Promise<NotificationGroup> {
        return this.prisma.notificationGroup.create({
            data: {
                name: createNotificationGroupDto.name,
                description: createNotificationGroupDto.description,
                notifications: {
                    connect: createNotificationGroupDto.notifications.map(id => ({ id }))
                }
            },
            include: {
                notifications: true
            }
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<NotificationGroup>> {
        const { take, skip } = params;
        const [data, total] = await this.prisma.$transaction([
            this.prisma.notificationGroup.findMany({
                include: {
                    notifications: true
                },
                skip,
                take
            }),
            this.prisma.notificationGroup.count()
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

    async update(id: number, updateNotificationGroupDto: UpdateNotificationGroupDto & { notifications: number[] }): Promise<NotificationGroup> {
        try {
            return await this.prisma.notificationGroup.update({
                where: { id },
                data: {
                    name: updateNotificationGroupDto.name,
                    description: updateNotificationGroupDto.description,
                    notifications: updateNotificationGroupDto.notifications ? {
                        set: updateNotificationGroupDto.notifications.map(id => ({ id }))
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
