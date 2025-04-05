// import { Injectable, NotFoundException } from '@nestjs/common';
// import { BaseService } from '../../common/services/base.service';
// import { PrismaService } from '../../prisma/prisma.service';
// import { Shipping, ShippingStatus } from '@prisma/client';

// @Injectable()
// export class ShippingService extends BaseService<Shipping> {
//     constructor(prisma: PrismaService) {
//         super(prisma, 'shipping');
//     }

//     protected getSearchFields(): string[] {
//         return ['trackingNumber'];
//     }

//     protected getIncludeFields(): any {
//         return {
//             order: true,
//         };
//     }

//     async getShippingProfile(id: number): Promise<Shipping> {
//         const shipping = await this.prisma.shipping.findUnique({
//             where: { id },
//             include: this.getIncludeFields(),
//         });
//         if (!shipping) {
//             throw new NotFoundException('الشحن غير موجود');
//         }
//         return shipping;
//     }

//     async getOrderShipping(orderId: number): Promise<Shipping> {
//         const shipping = await this.prisma.shipping.findFirst({
//             where: { orderId },
//             include: this.getIncludeFields(),
//         });
//         if (!shipping) {
//             throw new NotFoundException('الشحن غير موجود');
//         }
//         return shipping;
//     }

//     async updateShippingStatus(id: number, status: ShippingStatus): Promise<Shipping> {
//         const shipping = await this.getShippingProfile(id);
//         return this.prisma.shipping.update({
//             where: { id },
//             data: { status },
//         });
//     }

//     async getShippingsByStatus(status: ShippingStatus): Promise<Shipping[]> {
//         return this.prisma.shipping.findMany({
//             where: { status },
//             include: this.getIncludeFields(),
//             orderBy: { createdAt: 'desc' },
//         });
//     }

//     async getPendingShippings(): Promise<Shipping[]> {
//         return this.getShippingsByStatus(ShippingStatus.PENDING);
//     }

//     async getProcessingShippings(): Promise<Shipping[]> {
//         return this.getShippingsByStatus(ShippingStatus.PROCESSING);
//     }

//     async getShippedShippings(): Promise<Shipping[]> {
//         return this.getShippingsByStatus(ShippingStatus.SHIPPED);
//     }

//     async getDeliveredShippings(): Promise<Shipping[]> {
//         return this.getShippingsByStatus(ShippingStatus.DELIVERED);
//     }

//     async getCancelledShippings(): Promise<Shipping[]> {
//         return this.getShippingsByStatus(ShippingStatus.CANCELLED);
//     }

//     async getShippingsByMethod(method: string): Promise<Shipping[]> {
//         return this.prisma.shipping.findMany({
//             where: { method },
//             include: this.getIncludeFields(),
//             orderBy: { createdAt: 'desc' },
//         });
//     }

//     async updateTrackingNumber(id: number, trackingNumber: string): Promise<Shipping> {
//         const shipping = await this.getShippingProfile(id);
//         return this.prisma.shipping.update({
//             where: { id },
//             data: { trackingNumber },
//         });
//     }

//     async updateEstimatedDeliveryDate(id: number, estimatedDeliveryDate: string): Promise<Shipping> {
//         const shipping = await this.getShippingProfile(id);
//         return this.prisma.shipping.update({
//             where: { id },
//             data: { estimatedDeliveryDate },
//         });
//     }
// } 