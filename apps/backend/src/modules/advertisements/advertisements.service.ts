import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Advertisement, Sport, Role } from '@shared/prisma';

@Injectable()
export class AdvertisementsService extends BaseService<Advertisement> {
    constructor(prisma: PrismaService) {
        super(prisma, 'advertisement');
    }

    protected getSearchFields(): string[] {
        return ['title', 'description', 'keywords'];
    }

    protected getIncludeFields(): object {
        return {
            sponsor: true,
            analytics: true,
            campaign: true,
            targeting: {
                include: {
                    targetSegments: true,
                },
            },
        };
    }

    async getAdvertisementProfile(id: number): Promise<Advertisement> {
        const advertisement = await this.prisma.advertisement.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!advertisement) {
            throw new NotFoundException('الإعلان غير موجود');
        }
        return advertisement;
    }

    async getSponsorAdvertisements(sponsorId: number): Promise<Advertisement[]> {
        const advertisements = await this.prisma.advertisement.findMany({
            where: { sponsorId },
            include: this.getIncludeFields(),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return advertisements;
    }

    async getActiveAdvertisements(): Promise<Advertisement[]> {
        const advertisements = await this.prisma.advertisement.findMany({
            where: {
                status: 'ACTIVE',
                startDate: {
                    lte: new Date(),
                },
                endDate: {
                    gte: new Date(),
                },
            },
            include: this.getIncludeFields(),
        });
        return advertisements;
    }

    async incrementClicks(id: number): Promise<Advertisement> {
        const advertisement = await this.prisma.advertisement.update({
            where: { id },
            data: {
                clicks: {
                    increment: 1,
                },
            },
            include: this.getIncludeFields(),
        });
        return advertisement;
    }

    async incrementImpressions(id: number): Promise<Advertisement> {
        const advertisement = await this.prisma.advertisement.update({
            where: { id },
            data: {
                impressions: {
                    increment: 1,
                },
            },
            include: this.getIncludeFields(),
        });
        return advertisement;
    }

    async getAdvertisementsBySport(sport: string): Promise<Advertisement[]> {
        const advertisements = await this.prisma.advertisement.findMany({
            where: {
                targetSports: {
                    has: sport as Sport,
                },
                status: 'ACTIVE',
                startDate: {
                    lte: new Date(),
                },
                endDate: {
                    gte: new Date(),
                },
            },
            include: this.getIncludeFields(),
        });
        return advertisements;
    }

    async getAdvertisementsByRole(role: string): Promise<Advertisement[]> {
        const advertisements = await this.prisma.advertisement.findMany({
            where: {
                targetRoles: {
                    has: role as Role,
                },
                status: 'ACTIVE',
                startDate: {
                    lte: new Date(),
                },
                endDate: {
                    gte: new Date(),
                },
            },
            include: this.getIncludeFields(),
        });
        return advertisements;
    }
} 