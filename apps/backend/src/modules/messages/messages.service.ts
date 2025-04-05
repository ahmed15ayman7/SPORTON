import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessagesService extends BaseService<Message> {
    constructor(prisma: PrismaService) {
        super(prisma, 'message');
    }

    protected getSearchFields(): string[] {
        return ['content'];
    }

    protected getIncludeFields(): object {
        return {
            sender: true,
            recipient: true,
            rooms: true,
        };
    }

    async getMessageProfile(id: number): Promise<Message> {
        const message = await this.prisma.message.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!message) {
            throw new NotFoundException('الرسالة غير موجودة');
        }
        return message;
    }

    async getUserSentMessages(userId: number): Promise<Message[]> {
        const messages = await this.prisma.message.findMany({
            where: { senderId: userId },
            include: this.getIncludeFields(),
        });
        return messages;
    }

    async getUserReceivedMessages(userId: number): Promise<Message[]> {
        const messages = await this.prisma.message.findMany({
            where: { recipientId: userId },
            include: this.getIncludeFields(),
        });
        return messages;
    }

    async getRoomMessages(roomId: number): Promise<Message[]> {
        const messages = await this.prisma.message.findMany({
            where: {
                Room: {
                    some: {
                        id: roomId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return messages;
    }

    async markAsRead(id: number): Promise<Message> {
        const message = await this.prisma.message.update({
            where: { id },
            data: { isRead: true },
            include: this.getIncludeFields(),
        });
        return message;
    }
} 