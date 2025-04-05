import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { InjuryStatus, Injury, InjurySeverity } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class InjuryService {
    constructor(private prisma: PrismaService) { }

    async create(createInjuryDto: CreateInjuryDto): Promise<Injury> {
        return this.prisma.injury.create({
            data: {
                playerId: createInjuryDto.playerId,
                type: createInjuryDto.type,
                description: createInjuryDto.description,
                startDate: createInjuryDto.startDate ? new Date(createInjuryDto.startDate) : new Date(),
                endDate: createInjuryDto.endDate ? new Date(createInjuryDto.endDate) : null,
                severity: createInjuryDto.severity as InjurySeverity,
                status: createInjuryDto.status,
                treatment: createInjuryDto.treatment,
                medicalReport: createInjuryDto.medicalReport,
                doctor: createInjuryDto.doctor,
            },
            include: {
                player: true
            }
        });
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Injury>> {
        const { skip, take } = paginationDto;
        const total = await this.prisma.injury.count();
        const injuries = await this.prisma.injury.findMany({
            skip,
            take,
            include: {
                player: true
            }
        });
        return { data: injuries, meta: { total, skip: skip || 0, take: take || 10, hasMore: (skip || 0) + (take || 10) < total } };
    }

    async findOne(id: number): Promise<Injury> {
        const injury = await this.prisma.injury.findUnique({
            where: { id },
            include: {
                player: true
            }
        });

        if (!injury) {
            throw new NotFoundException(`الإصابة رقم ${id} غير موجودة`);
        }

        return injury;
    }

    async findByPlayer(playerId: number): Promise<Injury[]> {
        return this.prisma.injury.findMany({
            where: { playerId },
            include: {
                player: true
            }
        });
    }

    async findByStatus(status: InjuryStatus): Promise<Injury[]> {
        return this.prisma.injury.findMany({
            where: { status },
            include: {
                player: true
            }
        });
    }

    async update(id: number, updateInjuryDto: UpdateInjuryDto): Promise<Injury> {
        try {
            return await this.prisma.injury.update({
                where: { id },
                data: {
                    type: updateInjuryDto.type,
                    description: updateInjuryDto.description,
                    startDate: updateInjuryDto.startDate ? new Date(updateInjuryDto.startDate) : new Date(),
                    endDate: updateInjuryDto.endDate ? new Date(updateInjuryDto.endDate) : null,
                    severity: updateInjuryDto.severity as InjurySeverity,
                    status: updateInjuryDto.status,
                    treatment: updateInjuryDto.treatment,
                },
                include: {
                    player: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`الإصابة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number): Promise<Injury> {
        try {
            return await this.prisma.injury.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`الإصابة رقم ${id} غير موجودة`);
        }
    }

    async updateStatus(id: number, status: InjuryStatus): Promise<Injury> {
        try {
            return await this.prisma.injury.update({
                where: { id },
                data: { status },
                include: {
                    player: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`الإصابة رقم ${id} غير موجودة`);
        }
    }
} 