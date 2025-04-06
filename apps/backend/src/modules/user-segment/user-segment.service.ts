import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserSegment, User, AdTargeting, TargetingPerformance } from '@shared/prisma';

@Injectable()
export class UserSegmentService extends BaseService<UserSegment> {
    constructor(prisma: PrismaService) {
        super(prisma, 'userSegment');
    }

    protected getSearchFields(): string[] {
        return ['name', 'criteria'];
    }

    protected getIncludeFields(): object {
        return {
            users: true,
            AdTargeting: true,
            TargetingPerformance: true,
        };
    }

    async getSegmentProfile(id: number): Promise<UserSegment> {
        const segment = await this.prisma.userSegment.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!segment) {
            throw new NotFoundException('فئة المستخدم غير موجودة');
        }
        return segment;
    }

    async getSegmentUsers(id: number): Promise<User[]> {
        const segment = await this.prisma.userSegment.findUnique({
            where: { id },
            include: {
                users: true,
            },
        });
        if (!segment) {
            throw new NotFoundException('فئة المستخدم غير موجودة');
        }
        return segment.users;
    }

    async getSegmentTargeting(id: number): Promise<AdTargeting[]> {
        const segment = await this.prisma.userSegment.findUnique({
            where: { id },
            include: {
                AdTargeting: true,
            },
        });
        if (!segment) {
            throw new NotFoundException('فئة المستخدم غير موجودة');
        }
        return segment.AdTargeting;
    }

    async getSegmentPerformance(id: number): Promise<TargetingPerformance[]> {
        const segment = await this.prisma.userSegment.findUnique({
            where: { id },
            include: {
                TargetingPerformance: true,
            },
        });
        if (!segment) {
            throw new NotFoundException('فئة المستخدم غير موجودة');
        }
        return segment.TargetingPerformance;
    }
} 