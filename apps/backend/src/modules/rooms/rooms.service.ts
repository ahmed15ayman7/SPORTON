import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Room } from '@prisma/client';

@Injectable()
export class RoomsService extends BaseService<Room> {
    constructor(prisma: PrismaService) {
        super(prisma, 'room');
    }

    protected getSearchFields(): string[] {
        return ['name'];
    }

    protected getIncludeFields(): object {
        return {
            users: true,
            messages: true,
        };
    }

    async getRoomProfile(id: number): Promise<Room> {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!room) {
            throw new NotFoundException('الغرفة غير موجودة');
        }
        return room;
    }

    async getUserRooms(userId: number): Promise<Room[]> {
        const rooms = await this.prisma.room.findMany({
            where: {
                users: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return rooms;
    }

    async addUserToRoom(roomId: number, userId: number): Promise<Room> {
        const room = await this.prisma.room.update({
            where: { id: roomId },
            data: {
                users: {
                    create: {
                        userId: userId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return room;
    }

    async removeUserFromRoom(roomId: number, userId: number): Promise<Room> {
        const room = await this.prisma.room.update({
            where: { id: roomId },
            data: {
                users: {
                    delete: {
                        id: userId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return room;
    }
} 