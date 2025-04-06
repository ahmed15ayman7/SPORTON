import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Commission, PaymentStatus } from '@shared/prisma';
@Injectable()
export class CommissionService {
    constructor(private prisma: PrismaService) { }

    async create(createCommissionDto: CreateCommissionDto): Promise<Commission> {
        return this.prisma.commission.create({
            data: {
                agentId: createCommissionDto.agentId,
                transferId: createCommissionDto.transferId,
                amount: createCommissionDto.amount,
                percentage: createCommissionDto.percentage,
                currency: createCommissionDto.currency,
                paymentDate: createCommissionDto.paymentDate,
                status: createCommissionDto.status,
            },
            include: {
                agent: true,
                transfer: true
            }
        });
    }

    async findAll(params: PaginationDto): Promise<Commission[]> {
        return this.prisma.commission.findMany({
            include: {
                agent: true,
                transfer: true
            }
        });
    }

    async findOne(id: number): Promise<Commission> {
        const commission = await this.prisma.commission.findUnique({
            where: { id },
            include: {
                agent: true,
                transfer: true
            }
        });

        if (!commission) {
            throw new NotFoundException(`العمولة رقم ${id} غير موجودة`);
        }

        return commission;
    }

    async findByAgent(agentId: number): Promise<Commission[]> {
        return this.prisma.commission.findMany({
            where: { agentId },
            include: {
                agent: true,
                transfer: true
            }
        });
    }

    async findByTransfer(transferId: number): Promise<Commission[]> {
        return this.prisma.commission.findMany({
            where: { transferId },
            include: {
                agent: true,
                transfer: true
            }
        });
    }

    async findByStatus(status: PaymentStatus): Promise<Commission[]> {
        return this.prisma.commission.findMany({
            where: { status },
            include: {
                agent: true,
                transfer: true
            }
        });
    }

    async update(id: number, updateCommissionDto: UpdateCommissionDto): Promise<Commission> {
        try {
            return await this.prisma.commission.update({
                where: { id },
                data: {
                    status: updateCommissionDto.status,
                },
                include: {
                    agent: true,
                    transfer: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`العمولة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number): Promise<Commission> {
        try {
            return await this.prisma.commission.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`العمولة رقم ${id} غير موجودة`);
        }
    }
} 