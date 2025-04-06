import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Competition, CompetitionStatus, Sport, Prisma } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@Injectable()
export class CompetitionsService extends BaseService<Competition> {
    constructor(prisma: PrismaService) {
        super(prisma, 'competition');
    }

    protected getSearchFields(): string[] {
        return ['status'];
    }

    protected getIncludeFields(): object {
        return {
            competition: true,
        };
    }

    async getCompetitionProfile(id: number): Promise<Competition> {
        const competition = await this.prisma.competition.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!competition) {
            throw new NotFoundException('المسابقة غير موجودة');
        }
        return competition;
    }

    async getCompetitions(paginationDto: PaginationDto): Promise<PaginatedResponse<Competition>> {
        const { take, skip, search } = paginationDto;
        const where: Prisma.CompetitionWhereInput = {};
        if (search) {
            where.title = { contains: search, mode: 'insensitive' };
        }
        const [competitions, total] = await this.prisma.$transaction([
            this.prisma.competition.findMany({ where, take, skip }),
            this.prisma.competition.count({ where }),
        ]);
        return {
            data: competitions,
            meta: {
                total,
                take: take || 10,
                skip: skip || 0,
                hasMore: (skip || 0) + (take || 10) < total,
            },
        };
    }

    async getCompetitionById(id: number): Promise<Competition> {
        const competition = await this.prisma.competition.findUnique({ where: { id } });
        if (!competition) {
            throw new NotFoundException('المسابقة غير موجودة');
        }
        return competition;
    }

    async getCompetitionByTitle(title: string): Promise<Competition> {
        const competition = await this.prisma.competition.findFirst({ where: { title: { equals: title } } });
        if (!competition) {
            throw new NotFoundException('المسابقة غير موجودة');
        }
        return competition;
    }

    async getCompetitionBySport(sport: Sport): Promise<Competition[]> {
        const competitions = await this.prisma.competition.findMany({ where: { sport } });
        if (!competitions) {
            throw new NotFoundException('المسابقات غير موجودة');
        }
        return competitions;
    }

    async getCompetitionByStatus(status: CompetitionStatus): Promise<Competition[]> {
        const competitions = await this.prisma.competition.findMany({ where: { status } });
        if (!competitions) {
            throw new NotFoundException('المسابقات غير موجودة');
        }
        return competitions;
    }
}