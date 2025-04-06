import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ABTest } from '@shared/prisma';

@Injectable()
export class ABTestService extends BaseService<ABTest> {
    constructor(prisma: PrismaService) {
        super(prisma, 'aBTest');
    }

    protected getSearchFields(): string[] {
        return ['name', 'description', 'metrics'];
    }

    protected getIncludeFields(): object {
        return {
            variants: true,
        };
    }

    async getTestProfile(id: number): Promise<ABTest> {
        const test = await this.prisma.aBTest.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!test) {
            throw new NotFoundException('تجربة A/B غير موجودة');
        }
        return test;
    }

    async getTestVariants(id: number): Promise<any> {
        const test = await this.prisma.aBTest.findUnique({
            where: { id },
            include: {
                variants: true,
            },
        });
        if (!test) {
            throw new NotFoundException('تجربة A/B غير موجودة');
        }
        return test.variants;
    }

    async getTestMetrics(id: number): Promise<any> {
        const test = await this.prisma.aBTest.findUnique({
            where: { id },
        });
        if (!test) {
            throw new NotFoundException('تجربة A/B غير موجودة');
        }
        return test.metrics;
    }

    async getTestWinner(id: number): Promise<any> {
        const test = await this.prisma.aBTest.findUnique({
            where: { id },
            include: {
                variants: true,
            },
        });
        if (!test) {
            throw new NotFoundException('تجربة A/B غير موجودة');
        }
        return test.winner;
    }
} 