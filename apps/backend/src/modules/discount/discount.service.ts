import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Discount } from '@prisma/client';

@Injectable()
export class DiscountService extends BaseService<Discount> {
    constructor(prisma: PrismaService) {
        super(prisma, 'discount');
    }

    protected getSearchFields(): string[] {
        return [];
    }

    protected getIncludeFields(): any {
        return {
            product: true,
        };
    }

    async getDiscountProfile(id: number): Promise<Discount> {
        const discount = await this.prisma.discount.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!discount) {
            throw new NotFoundException('الخصم غير موجود');
        }
        return discount;
    }

    async getProductDiscount(productId: number): Promise<Discount | null> {
        const now = new Date();
        return this.prisma.discount.findFirst({
            where: {
                productId,
                active: true,
                startDate: { lte: now },
                endDate: { gte: now },
            },
            include: this.getIncludeFields(),
        });
    }

    async getActiveDiscounts(): Promise<Discount[]> {
        const now = new Date();
        return this.prisma.discount.findMany({
            where: {
                active: true,
                startDate: { lte: now },
                endDate: { gte: now },
            },
            include: this.getIncludeFields(),
        });
    }

    async getUpcomingDiscounts(): Promise<Discount[]> {
        const now = new Date();
        return this.prisma.discount.findMany({
            where: {
                active: true,
                startDate: { gt: now },
            },
            include: this.getIncludeFields(),
        });
    }

    async getExpiredDiscounts(): Promise<Discount[]> {
        const now = new Date();
        return this.prisma.discount.findMany({
            where: {
                endDate: { lt: now },
            },
            include: this.getIncludeFields(),
        });
    }

    async activateDiscount(id: number): Promise<Discount> {
        const discount = await this.getDiscountProfile(id);
        return this.prisma.discount.update({
            where: { id },
            data: { active: true },
        });
    }

    async deactivateDiscount(id: number): Promise<Discount> {
        const discount = await this.getDiscountProfile(id);
        return this.prisma.discount.update({
            where: { id },
            data: { active: false },
        });
    }

    async extendDiscount(id: number, newEndDate: Date): Promise<Discount> {
        const discount = await this.getDiscountProfile(id);
        return this.prisma.discount.update({
            where: { id },
            data: { endDate: newEndDate },
        });
    }

    async updateDiscountPercentage(id: number, newPercentage: number): Promise<Discount> {
        const discount = await this.getDiscountProfile(id);
        return this.prisma.discount.update({
            where: { id },
            data: { percentage: newPercentage },
        });
    }
} 