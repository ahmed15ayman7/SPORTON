import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentsService extends BaseService<Payment> {
    constructor(prisma: PrismaService) {
        super(prisma, 'payment');
    }

    protected getSearchFields(): string[] {
        return ['description'];
    }

    protected getIncludeFields(): object {
        return {
            user: true,
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

    async getUserPayments(userId: number) {
        const payments = await this.prisma.payment.findMany({
            where: { userId },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return payments;
    }

    async getPaymentsByType(type: string) {
        const payments = await this.prisma.payment.findMany({
            where: { type },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return payments;
    }

    async getPaymentsByStatus(status: string) {
        const payments = await this.prisma.payment.findMany({
            where: { status },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return payments;
    }

    async getPaymentsByDateRange(startDate: Date, endDate: Date) {
        const payments = await this.prisma.payment.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: this.getIncludeFields(),
            orderBy: {
                date: 'desc',
            },
        });
        return payments;
    }

    async updatePaymentStatus(id: number, status: string) {
        return this.prisma.payment.update({
            where: { id },
            data: { status },
            include: this.getIncludeFields(),
        });
    }

    async getPaymentStatistics(userId: number) {
        const payments = await this.prisma.payment.findMany({
            where: { userId },
            include: this.getIncludeFields(),
        });

        const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
        const completedPayments = payments.filter(payment => payment.status === 'COMPLETED');
        const pendingPayments = payments.filter(payment => payment.status === 'PENDING');
        const failedPayments = payments.filter(payment => payment.status === 'FAILED');
        const refundedPayments = payments.filter(payment => payment.status === 'REFUNDED');

        return {
            totalAmount,
            totalPayments: payments.length,
            completedPayments: completedPayments.length,
            pendingPayments: pendingPayments.length,
            failedPayments: failedPayments.length,
            refundedPayments: refundedPayments.length,
        };
    }
} 