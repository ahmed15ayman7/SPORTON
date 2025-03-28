import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaintenanceScheduleDto } from './dto/create-maintenance-schedule.dto';
import { UpdateMaintenanceScheduleDto } from './dto/update-maintenance-schedule.dto';

@Injectable()
export class MaintenanceScheduleService {
    constructor(private prisma: PrismaService) { }

    async create(createMaintenanceScheduleDto: CreateMaintenanceScheduleDto) {
        return this.prisma.maintenanceSchedule.create({
            data: createMaintenanceScheduleDto,
            include: {
                facility: true,
            },
        });
    }

    async findAll() {
        return this.prisma.maintenanceSchedule.findMany({
            include: {
                facility: true,
            },
        });
    }

    async findOne(id: number) {
        const schedule = await this.prisma.maintenanceSchedule.findUnique({
            where: { id },
            include: {
                facility: true,
            },
        });

        if (!schedule) {
            throw new NotFoundException(`جدول الصيانة رقم ${id} غير موجود`);
        }

        return schedule;
    }

    async findByFacility(facilityId: number) {
        return this.prisma.maintenanceSchedule.findMany({
            where: { facilityId },
            include: {
                facility: true,
            },
        });
    }

    async findByStatus(status: string) {
        return this.prisma.maintenanceSchedule.findMany({
            where: { status },
            include: {
                facility: true,
            },
        });
    }

    async findByDateRange(startDate: Date, endDate: Date) {
        return this.prisma.maintenanceSchedule.findMany({
            where: {
                scheduledDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                facility: true,
            },
        });
    }

    async update(id: number, updateMaintenanceScheduleDto: UpdateMaintenanceScheduleDto) {
        try {
            return await this.prisma.maintenanceSchedule.update({
                where: { id },
                data: updateMaintenanceScheduleDto,
                include: {
                    facility: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`جدول الصيانة رقم ${id} غير موجود`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.maintenanceSchedule.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`جدول الصيانة رقم ${id} غير موجود`);
        }
    }
} 