import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractStatus } from './dto/create-contract.dto';

@Injectable()
export class ContractService {
    constructor(private prisma: PrismaService) { }

    async create(createContractDto: CreateContractDto) {
        return this.prisma.contract.create({
            data: {
                playerId: createContractDto.playerId,
                clubId: createContractDto.clubId,
                startDate: createContractDto.startDate,
                endDate: createContractDto.endDate,
                salary: createContractDto.salary,
                terms: createContractDto.terms,
                status: createContractDto.status,
                notes: createContractDto.notes
            },
            include: {
                player: true,
                club: true
            }
        });
    }

    async findAll() {
        return this.prisma.contract.findMany({
            include: {
                player: true,
                club: true
            }
        });
    }

    async findOne(id: number) {
        const contract = await this.prisma.contract.findUnique({
            where: { id },
            include: {
                player: true,
                club: true
            }
        });

        if (!contract) {
            throw new NotFoundException(`العقد رقم ${id} غير موجود`);
        }

        return contract;
    }

    async findByPlayer(playerId: number) {
        return this.prisma.contract.findMany({
            where: { playerId },
            include: {
                player: true,
                club: true
            }
        });
    }

    async findByClub(clubId: number) {
        return this.prisma.contract.findMany({
            where: { clubId },
            include: {
                player: true,
                club: true
            }
        });
    }

    async findByStatus(status: ContractStatus) {
        return this.prisma.contract.findMany({
            where: { status },
            include: {
                player: true,
                club: true
            }
        });
    }

    async update(id: number, updateContractDto: UpdateContractDto) {
        try {
            return await this.prisma.contract.update({
                where: { id },
                data: {
                    startDate: updateContractDto.startDate,
                    endDate: updateContractDto.endDate,
                    salary: updateContractDto.salary,
                    terms: updateContractDto.terms,
                    status: updateContractDto.status,
                    notes: updateContractDto.notes
                },
                include: {
                    player: true,
                    club: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`العقد رقم ${id} غير موجود`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.contract.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`العقد رقم ${id} غير موجود`);
        }
    }

    async updateStatus(id: number, status: ContractStatus) {
        try {
            return await this.prisma.contract.update({
                where: { id },
                data: { status },
                include: {
                    player: true,
                    club: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`العقد رقم ${id} غير موجود`);
        }
    }
} 