import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { InjuryStatus } from './dto/create-injury.dto';

@Injectable()
export class InjuryService {
    constructor(private prisma: PrismaService) { }

    async create(createInjuryDto: CreateInjuryDto) {
        return this.prisma.injury.create({
            data: {
                playerId: createInjuryDto.playerId,
                type: createInjuryDto.type,
                description: createInjuryDto.description,
                injuryDate: createInjuryDto.injuryDate,
                expectedRecoveryDate: createInjuryDto.expectedRecoveryDate,
                severity: createInjuryDto.severity,
                status: createInjuryDto.status,
                treatment: createInjuryDto.treatment,
                notes: createInjuryDto.notes
            },
            include: {
                player: true
            }
        });
    }

    async findAll() {
        return this.prisma.injury.findMany({
            include: {
                player: true
            }
        });
    }

    async findOne(id: number) {
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

    async findByPlayer(playerId: number) {
        return this.prisma.injury.findMany({
            where: { playerId },
            include: {
                player: true
            }
        });
    }

    async findByStatus(status: InjuryStatus) {
        return this.prisma.injury.findMany({
            where: { status },
            include: {
                player: true
            }
        });
    }

    async update(id: number, updateInjuryDto: UpdateInjuryDto) {
        try {
            return await this.prisma.injury.update({
                where: { id },
                data: {
                    type: updateInjuryDto.type,
                    description: updateInjuryDto.description,
                    injuryDate: updateInjuryDto.injuryDate,
                    expectedRecoveryDate: updateInjuryDto.expectedRecoveryDate,
                    severity: updateInjuryDto.severity,
                    status: updateInjuryDto.status,
                    treatment: updateInjuryDto.treatment,
                    notes: updateInjuryDto.notes
                },
                include: {
                    player: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`الإصابة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.injury.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`الإصابة رقم ${id} غير موجودة`);
        }
    }

    async updateStatus(id: number, status: InjuryStatus) {
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