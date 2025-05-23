import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderItem } from '@shared/prisma';

@Injectable()
export class OrderItemService extends BaseService<OrderItem> {
    constructor(prisma: PrismaService) {
        super(prisma, 'orderItem');
    }

    protected getSearchFields(): string[] {
        return [];
    }

    protected getIncludeFields(): any {
        return {
            order: true,
            product: true,
            variant: true,
        };
    }

    async getOrderItemProfile(id: number): Promise<OrderItem> {
        const orderItem = await this.prisma.orderItem.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!orderItem) {
            throw new NotFoundException('عنصر الطلب غير موجود');
        }
        return orderItem;
    }

    async getOrderItems(orderId: number): Promise<OrderItem[]> {
        return this.prisma.orderItem.findMany({
            where: { orderId },
            include: this.getIncludeFields(),
        });
    }

    async updateOrderItemQuantity(id: number, quantity: number): Promise<OrderItem> {
        const orderItem = await this.getOrderItemProfile(id);
        return this.prisma.orderItem.update({
            where: { id },
            data: { quantity },
        });
    }

    async updateOrderItemPrice(id: number, price: number): Promise<OrderItem> {
        const orderItem = await this.getOrderItemProfile(id);
        return this.prisma.orderItem.update({
            where: { id },
            data: { price },
        });
    }

    async getOrderItemsByProduct(productId: number): Promise<OrderItem[]> {
        return this.prisma.orderItem.findMany({
            where: { productId },
            include: this.getIncludeFields(),
        });
    }

    async getOrderItemsByVariant(variantId: number): Promise<OrderItem[]> {
        return this.prisma.orderItem.findMany({
            where: { variantId },
            include: this.getIncludeFields(),
        });
    }
} 