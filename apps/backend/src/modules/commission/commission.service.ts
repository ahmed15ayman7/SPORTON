import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@Injectable()
export class CommissionService {
    constructor(private prisma: PrismaService) { }

    async create(createCommissionDto: CreateCommissionDto) {
        return this.prisma.commission.create({
            data: {
                agentId: createCommissionDto.agentId,
                transactionId: createCommissionDto.transactionId,
                type: createCommissionDto.type,
                status: createCommissionDto.status,
                amount: createCommissionDto.amount,
                createdAt: createCommissionDto.createdAt,
                paidAt: createCommissionDto.paidAt,
                notes: createCommissionDto.notes
            },
            include: {
                agent: true,
                transaction: true
            }
        });
    }

    async findAll() {
        return this.prisma.commission.findMany({
            include: {
                agent: true,
                transaction: true
            }
        });
    }

    async findOne(id: number) {
        const commission = await this.prisma.commission.findUnique({
            where: { id },
            include: {
                agent: true,
                transaction: true
            }
        });

        if (!commission) {
            throw new NotFoundException(`العمولة رقم ${id} غير موجودة`);
        }

        return commission;
    }

    async findByAgent(agentId: number) {
        return this.prisma.commission.findMany({
            where: { agentId },
            include: {
                agent: true,
                transaction: true
            }
        });
    }

    async findByTransaction(transactionId: number) {
        return this.prisma.commission.findMany({
            where: { transactionId },
            include: {
                agent: true,
                transaction: true
            }
        });
    }

    async findByStatus(status: string) {
        return this.prisma.commission.findMany({
            where: { status },
            include: {
                agent: true,
                transaction: true
            }
        });
    }

    async update(id: number, updateCommissionDto: UpdateCommissionDto) {
        try {
            return await this.prisma.commission.update({
                where: { id },
                data: {
                    status: updateCommissionDto.status,
                    paidAt: updateCommissionDto.paidAt,
                    notes: updateCommissionDto.notes
                },
                include: {
                    agent: true,
                    transaction: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`العمولة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.commission.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`العمولة رقم ${id} غير موجودة`);
        }
    }
} 