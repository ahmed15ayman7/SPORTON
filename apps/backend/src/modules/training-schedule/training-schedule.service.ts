import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainingScheduleDto } from './dto/create-training-schedule.dto';
import { UpdateTrainingScheduleDto } from './dto/update-training-schedule.dto';

@Injectable()
export class TrainingScheduleService {
    constructor(private prisma: PrismaService) { }

    async create(createTrainingScheduleDto: CreateTrainingScheduleDto) {
        return this.prisma.trainingSchedule.create({
            data: createTrainingScheduleDto,
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });
    }

    async findAll() {
        return this.prisma.trainingSchedule.findMany({
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });
    }

    async findOne(id: number) {
        const schedule = await this.prisma.trainingSchedule.findUnique({
            where: { id },
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });

        if (!schedule) {
            throw new NotFoundException(`جدول التدريب رقم ${id} غير موجود`);
        }

        return schedule;
    }

    async findByTeam(teamId: number) {
        return this.prisma.trainingSchedule.findMany({
            where: { teamId },
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });
    }

    async findByCoach(coachId: number) {
        return this.prisma.trainingSchedule.findMany({
            where: { coachId },
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });
    }

    async findByFacility(facilityId: number) {
        return this.prisma.trainingSchedule.findMany({
            where: { facilityId },
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });
    }

    async findByStatus(status: string) {
        return this.prisma.trainingSchedule.findMany({
            where: { status },
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });
    }

    async findByDateRange(startDate: Date, endDate: Date) {
        return this.prisma.trainingSchedule.findMany({
            where: {
                startDate: {
                    gte: startDate,
                },
                endDate: {
                    lte: endDate,
                },
            },
            include: {
                team: true,
                coach: true,
                facility: true,
            },
        });
    }

    async update(id: number, updateTrainingScheduleDto: UpdateTrainingScheduleDto) {
        try {
            return await this.prisma.trainingSchedule.update({
                where: { id },
                data: updateTrainingScheduleDto,
                include: {
                    team: true,
                    coach: true,
                    facility: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`جدول التدريب رقم ${id} غير موجود`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.trainingSchedule.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`جدول التدريب رقم ${id} غير موجود`);
        }
    }
} 