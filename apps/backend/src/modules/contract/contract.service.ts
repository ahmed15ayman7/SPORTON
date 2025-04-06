import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractStatus } from './dto/create-contract.dto';
import { Contract } from '@shared/prisma';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
@Injectable()
export class ContractService {
    constructor(private prisma: PrismaService) { }

    async create(createContractDto: CreateContractDto): Promise<Contract> {
        return this.prisma.contract.create({
            data: {
                playerId: createContractDto.playerId,
                clubId: createContractDto.clubId,
                startDate: createContractDto.startDate,
                endDate: createContractDto.endDate,
                salary: createContractDto.salary,
                terms: createContractDto.terms,
                status: createContractDto.status,
                currency: createContractDto.currency,
            },
            include: {
                player: true,
                club: true
            }
        });
    }

    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Contract>> {
        const { skip, take } = paginationDto;
        const contracts = await this.prisma.contract.findMany({
            skip,
            take,
            include: {
                player: true,
                club: true
            }
        });
        const total = await this.prisma.contract.count();
        return {
            data: contracts,
            meta: {
                total,
                skip: skip || 0,
                take: take || 10,
                hasMore: (skip || 0) + (take || 10) < total
            }
        };
    }

    async findOne(id: number): Promise<Contract> {
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

    async findByPlayer(playerId: number): Promise<Contract[]> {
        return this.prisma.contract.findMany({
            where: { playerId },
            include: {
                player: true,
                club: true
            }
        });
    }

    async findByClub(clubId: number): Promise<Contract[]> {
        return this.prisma.contract.findMany({
            where: { clubId },
            include: {
                player: true,
                club: true
            }
        });
    }

    async findByStatus(status: ContractStatus): Promise<Contract[]> {
        return this.prisma.contract.findMany({
            where: { status },
            include: {
                player: true,
                club: true
            }
        });
    }

    async update(id: number, updateContractDto: UpdateContractDto): Promise<Contract> {
        try {
            return await this.prisma.contract.update({
                where: { id },
                data: {
                    startDate: updateContractDto.startDate,
                    endDate: updateContractDto.endDate,
                    salary: updateContractDto.salary,
                    terms: updateContractDto.terms,
                    status: updateContractDto.status,
                    currency: updateContractDto.currency,
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

    async remove(id: number): Promise<Contract> {
        try {
            return await this.prisma.contract.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`العقد رقم ${id} غير موجود`);
        }
    }

    async updateStatus(id: number, status: ContractStatus): Promise<Contract> {
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