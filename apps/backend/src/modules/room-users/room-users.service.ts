import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomUser } from '@shared/prisma';

@Injectable()
export class RoomUsersService extends BaseService<RoomUser> {
    constructor(prisma: PrismaService) {
        super(prisma, 'roomUser');
    }

    protected getSearchFields(): string[] {
        return [];
    }

    protected getIncludeFields(): object {
        return {
            room: true,
            user: true,
        };
    }

    async getRoomUserProfile(id: number): Promise<RoomUser> {
        const roomUser = await this.prisma.roomUser.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!roomUser) {
            throw new NotFoundException('علاقة المستخدم-الغرفة غير موجودة');
        }
        return roomUser;
    }

    async getUserRoomUsers(userId: number): Promise<RoomUser[]> {
        const roomUsers = await this.prisma.roomUser.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });
        return roomUsers;
    }

    async getRoomUsers(roomId: number): Promise<RoomUser[]> {
        const roomUsers = await this.prisma.roomUser.findMany({
            where: { roomId },
            include: this.getIncludeFields(),
        });
        return roomUsers;
    }

    async isUserInRoom(roomId: number, userId: number): Promise<boolean> {
        const roomUser = await this.prisma.roomUser.findFirst({
            where: {
                AND: [
                    { roomId },
                    { userId },
                ],
            },
        });
        return !!roomUser;
    }
} 