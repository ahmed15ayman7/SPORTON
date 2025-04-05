import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TrainingSchedule, TrainingScheduleStatus } from '@prisma/client';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class TrainingScheduleService extends BaseService<TrainingSchedule> {
    constructor(prisma: PrismaService) {
        super(prisma, 'trainingSchedule');
    }
    protected getIncludeFields(): object {
        return {
            team: true,
            coach: true,
            facility: true,
        };
    }
    async create(createTrainingScheduleDto: TrainingSchedule): Promise<TrainingSchedule> {
        return this.prisma.trainingSchedule.create({
            data: createTrainingScheduleDto,
            include: this.getIncludeFields(),
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<TrainingSchedule>> {
        const { skip, take } = params;
        const total = await this.prisma.trainingSchedule.count();
        const data = await this.prisma.trainingSchedule.findMany({
            skip,
            take,
            include: this.getIncludeFields(),
        });
        return {
            data,
            meta: {
                total,
                skip: skip || 0,
                take: take || 10,
                hasMore: (skip || 0) + (take || 10) < total,
            },
        };
    }

    async findOne(id: number): Promise<TrainingSchedule> {
        const schedule = await this.prisma.trainingSchedule.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });

        if (!schedule) {
            throw new NotFoundException(`جدول التدريب رقم ${id} غير موجود`);
        }

        return schedule;
    }

    async findByTeam(teamId: number): Promise<TrainingSchedule[]> {
        return this.prisma.trainingSchedule.findMany({
            where: { teamId },
            include: this.getIncludeFields(),
        });
    }

    async findByCoach(coachId: number): Promise<TrainingSchedule[]> {
        return this.prisma.trainingSchedule.findMany({
            where: { coachId },
            include: this.getIncludeFields(),
        });
    }

    async findByFacility(facilityId: number): Promise<TrainingSchedule[]> {
        return this.prisma.trainingSchedule.findMany({
            where: { facilityId },
            include: this.getIncludeFields(),
        });
    }

    async findByStatus(status: string): Promise<TrainingSchedule[]> {
        return this.prisma.trainingSchedule.findMany({
            where: { status: status as TrainingScheduleStatus },
            include: this.getIncludeFields(),
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<TrainingSchedule[]> {
        return this.prisma.trainingSchedule.findMany({
            where: {
                startTime: {
                    gte: startDate,
                },
                endTime: {
                    lte: endDate,
                },
            },
            include: this.getIncludeFields(),
        });
    }

    async update(id: number, updateTrainingScheduleDto: TrainingSchedule): Promise<TrainingSchedule> {
        try {
            return await this.prisma.trainingSchedule.update({
                where: { id },
                data: updateTrainingScheduleDto,
                include: this.getIncludeFields(),
            });
        } catch (error) {
            throw new NotFoundException(`جدول التدريب رقم ${id} غير موجود`);
        }
    }

    // async remove(id: number): Promise<TrainingSchedule> {
    //     try {
    //         return await this.prisma.trainingSchedule.delete({
    //             where: { id },
    //         });
    //     } catch (error) {
    //         throw new NotFoundException(`جدول التدريب رقم ${id} غير موجود`);
    //     }
    // }
} 