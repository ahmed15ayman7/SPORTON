import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Order, OrderStatus } from '@shared/prisma';

@Injectable()
export class OrderService extends BaseService<Order> {
    constructor(prisma: PrismaService) {
        super(prisma, 'order');
    }

    protected getSearchFields(): string[] {
        return ['orderNumber'];
    }

    protected getIncludeFields(): any {
        return {
            user: true,
            address: true,
            items: {
                include: {
                    product: true,
                    variant: true,
                },
            },
        };
    }

    async getOrderProfile(id: number): Promise<Order> {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!order) {
            throw new NotFoundException('الطلب غير موجود');
        }
        return order;
    }

    async getUserOrders(userId: number): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
        const order = await this.getOrderProfile(id);
        if (order.status !== OrderStatus.PENDING) {
            throw new Error('لا يمكن تحديث حالة الطلب في هذه الحالة');
        }

        return this.prisma.order.update({
            where: { id },
            data: { status },
        });
    }

    async cancelOrder(id: number): Promise<Order> {
        const order = await this.getOrderProfile(id);
        if (order.status !== OrderStatus.PENDING) {
            throw new Error('لا يمكن إلغاء الطلب في هذه الحالة');
        }
        return this.prisma.order.update({
            where: { id },
            data: { status: OrderStatus.CANCELLED },
        });
    }

    async getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: { status },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async getPendingOrders(): Promise<Order[]> {
        return this.getOrdersByStatus(OrderStatus.PENDING);
    }

    async getProcessingOrders(): Promise<Order[]> {
        return this.getOrdersByStatus(OrderStatus.PROCESSING);
    }

    async getShippedOrders(): Promise<Order[]> {
        return this.getOrdersByStatus(OrderStatus.SHIPPED);
    }

    async getDeliveredOrders(): Promise<Order[]> {
        return this.getOrdersByStatus(OrderStatus.DELIVERED);
    }

    async getCancelledOrders(): Promise<Order[]> {
        return this.getOrdersByStatus(OrderStatus.CANCELLED);
    }
} 