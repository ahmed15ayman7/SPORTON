import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Payment, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService extends BaseService<Payment> {
    constructor(prisma: PrismaService) {
        super(prisma, 'payment');
    }

    protected getSearchFields(): string[] {
        return ['transactionId'];
    }

    protected getIncludeFields(): any {
        return {
            order: true,
        };
    }

    async getPaymentProfile(id: number): Promise<Payment> {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!payment) {
            throw new NotFoundException('الدفعة غير موجودة');
        }
        return payment;
    }

    async getOrderPayments(orderId: number): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: { orderId },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async updatePaymentStatus(id: number, status: PaymentStatus): Promise<Payment> {
        const payment = await this.getPaymentProfile(id);
        return this.prisma.payment.update({
            where: { id },
            data: { status },
        });
    }

    async getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: { status },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }

    async getPendingPayments(): Promise<Payment[]> {
        return this.getPaymentsByStatus(PaymentStatus.PENDING);
    }

    async getCompletedPayments(): Promise<Payment[]> {
        return this.getPaymentsByStatus(PaymentStatus.COMPLETED);
    }

    async getFailedPayments(): Promise<Payment[]> {
        return this.getPaymentsByStatus(PaymentStatus.FAILED);
    }

    async getRefundedPayments(): Promise<Payment[]> {
        return this.getPaymentsByStatus(PaymentStatus.REFUNDED);
    }

    async getPaymentsByMethod(method: string): Promise<Payment[]> {
        return this.prisma.payment.findMany({
            where: { method },
            include: this.getIncludeFields(),
            orderBy: { createdAt: 'desc' },
        });
    }
} 