import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommissionDto } from '../../dtos/Commission.create.dto';
import { UpdateCommissionDto } from '../../dtos/Commission.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Commission, PaymentStatus } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class CommissionService extends BaseService<Commission> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'commission');
    }

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

    async findAll(params: PaginationDto): Promise<PaginatedResponse<Commission>> {
        const { skip, take } = params;
        const [commissions, total] = await this.prisma.$transaction([
            this.prisma.commission.findMany({
                skip,
                take,
                include: {
                    agent: true,
                    transfer: true
                }
            }),
            this.prisma.commission.count()
        ]);
        return {
            data: commissions,
            meta: { total, skip: skip ?? 0, take: take ?? 10, hasMore: (skip ?? 0) + (take ?? 10) < total }
        };
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