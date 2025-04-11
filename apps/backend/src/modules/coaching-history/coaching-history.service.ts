import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CoachingHistory } from '@shared/prisma';
import { CreateCoachingHistoryDto } from '../../dtos/CoachingHistory.create.dto';
import { UpdateCoachingHistoryDto } from '../../dtos/CoachingHistory.update.dto';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@Injectable()
export class CoachingHistoryService extends BaseService<CoachingHistory> {
    constructor(prisma: PrismaService) {
        super(prisma, 'coachingHistory');
    }

    async create(createCoachingHistoryDto: CreateCoachingHistoryDto): Promise<CoachingHistory> {
        return this.prisma.coachingHistory.create({
            data: createCoachingHistoryDto,
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<CoachingHistory>> {
        const { skip, take } = params;
        const coachingHistory = await this.prisma.coachingHistory.findMany({
            skip,
            take,
        });
        return {
            data: coachingHistory,
            meta: {
                total: coachingHistory.length,
                skip: skip || 0,
                take: take || 10,
                hasMore: coachingHistory.length === take,
            },
        };
    }

    async findOne(id: number): Promise<CoachingHistory> {
        const coachingHistory = await this.prisma.coachingHistory.findUnique({ where: { id } });
        if (!coachingHistory) {
            throw new NotFoundException('Coaching history not found');
        }
        return coachingHistory;
    }

    async findByCoach(coachId: number): Promise<CoachingHistory[]> {
        return this.prisma.coachingHistory.findMany({ where: { coachId } });
    }

    async findByClub(clubId: number): Promise<CoachingHistory[]> {
        return this.prisma.coachingHistory.findMany({ where: { clubId } });
    }

    async update(id: number, updateCoachingHistoryDto: UpdateCoachingHistoryDto): Promise<CoachingHistory> {
        return this.prisma.coachingHistory.update({ where: { id }, data: updateCoachingHistoryDto });
    }
}
