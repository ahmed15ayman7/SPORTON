import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaintenanceScheduleDto } from './dto/create-maintenance-schedule.dto';
import { UpdateMaintenanceScheduleDto } from './dto/update-maintenance-schedule.dto';
import { MaintenanceSchedule } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class MaintenanceScheduleService {
    constructor(private prisma: PrismaService) { }

    async create(createMaintenanceScheduleDto: CreateMaintenanceScheduleDto): Promise<MaintenanceSchedule> {
        return this.prisma.maintenanceSchedule.create({
            data: {
                ...createMaintenanceScheduleDto,
                startDate: new Date(createMaintenanceScheduleDto.startDate),
                endDate: new Date(createMaintenanceScheduleDto.endDate),
                type: createMaintenanceScheduleDto.type,
            },
            include: {
                facility: true,
            },
        });
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<MaintenanceSchedule>> {
        const { skip, take } = paginationDto;
        const total = await this.prisma.maintenanceSchedule.count();
        const maintenanceSchedules = await this.prisma.maintenanceSchedule.findMany({
            skip,
            take,
            include: {
                facility: true,
            },
        });
        return { data: maintenanceSchedules, meta: { total, skip: skip || 0, take: take || 10, hasMore: (skip || 0) + (take || 10) < total } };
    }

    async findOne(id: number): Promise<MaintenanceSchedule> {
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

    async findByFacility(facilityId: number): Promise<MaintenanceSchedule[]> {
        return this.prisma.maintenanceSchedule.findMany({
            where: { facilityId },
            include: {
                facility: true,
            },
        });
    }

    async findByStatus(status: string): Promise<MaintenanceSchedule[]> {
        return this.prisma.maintenanceSchedule.findMany({
            where: { status },
            include: {
                facility: true,
            },
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<MaintenanceSchedule[]> {
        return this.prisma.maintenanceSchedule.findMany({
            where: {
                startDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                facility: true,
            },
        });
    }

    async update(id: number, updateMaintenanceScheduleDto: UpdateMaintenanceScheduleDto): Promise<MaintenanceSchedule> {
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

    async remove(id: number): Promise<MaintenanceSchedule> {
        try {
            return await this.prisma.maintenanceSchedule.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`جدول الصيانة رقم ${id} غير موجود`);
        }
    }
} 