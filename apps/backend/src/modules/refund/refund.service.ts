// import { Injectable, NotFoundException } from '@nestjs/common';
// import { BaseService } from '../../common/services/base.service';
// import { PrismaService } from '../../prisma/prisma.service';
// import { Refund, RefundStatus } from '@prisma/client';

// @Injectable()
// export class RefundService extends BaseService<Refund> {
//     constructor(prisma: PrismaService) {
//         super(prisma, 'refund');
//     }

//     protected getSearchFields(): string[] {
//         return [];
//     }

//     protected getIncludeFields(): any {
//         return {
//             order: true,
//         };
//     }

//     async getRefundProfile(id: number): Promise<Refund> {
//         const refund = await this.prisma.refund.findUnique({
//             where: { id },
//             include: this.getIncludeFields(),
//         });
//         if (!refund) {
//             throw new NotFoundException('المرتجع غير موجود');
//         }
//         return refund;
//     }

//     async getOrderRefunds(orderId: number): Promise<Refund[]> {
//         return this.prisma.refund.findMany({
//             where: { orderId },
//             include: this.getIncludeFields(),
//             orderBy: { createdAt: 'desc' },
//         });
//     }

//     async updateRefundStatus(id: number, status: RefundStatus): Promise<Refund> {
//         const refund = await this.getRefundProfile(id);
//         return this.prisma.refund.update({
//             where: { id },
//             data: { status },
//         });
//     }

//     async getRefundsByStatus(status: RefundStatus): Promise<Refund[]> {
//         return this.prisma.refund.findMany({
//             where: { status },
//             include: this.getIncludeFields(),
//             orderBy: { createdAt: 'desc' },
//         });
//     }

//     async getPendingRefunds(): Promise<Refund[]> {
//         return this.getRefundsByStatus(RefundStatus.PENDING);
//     }

//     async getProcessingRefunds(): Promise<Refund[]> {
//         return this.getRefundsByStatus(RefundStatus.PROCESSING);
//     }

//     async getCompletedRefunds(): Promise<Refund[]> {
//         return this.getRefundsByStatus(RefundStatus.COMPLETED);
//     }

//     async getRejectedRefunds(): Promise<Refund[]> {
//         return this.getRefundsByStatus(RefundStatus.REJECTED);
//     }

//     async getRefundsByReason(reason: string): Promise<Refund[]> {
//         return this.prisma.refund.findMany({
//             where: { reason },
//             include: this.getIncludeFields(),
//             orderBy: { createdAt: 'desc' },
//         });
//     }

//     async updateRefundAmount(id: number, amount: number): Promise<Refund> {
//         const refund = await this.getRefundProfile(id);
//         return this.prisma.refund.update({
//             where: { id },
//             data: { amount },
//         });
//     }

//     async updateRefundDetails(id: number, details: string): Promise<Refund> {
//         const refund = await this.getRefundProfile(id);
//         return this.prisma.refund.update({
//             where: { id },
//             data: { details },
//         });
//     }
// } 