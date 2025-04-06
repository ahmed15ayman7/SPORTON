import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAgentClientDto } from './dto/create-agent-client.dto';
import { UpdateAgentClientDto } from './dto/update-agent-client.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { AgentClient, ClientStatus } from '@shared/prisma';
@Injectable()
export class AgentClientService {
    constructor(private prisma: PrismaService) { }

    async create(createAgentClientDto: CreateAgentClientDto): Promise<AgentClient> {
        return this.prisma.agentClient.create({
            data: {
                agentId: createAgentClientDto.agentId,
                playerId: createAgentClientDto.playerId,
                status: createAgentClientDto.status,
                startDate: createAgentClientDto.startDate ? new Date(createAgentClientDto.startDate) : new Date(),
                endDate: createAgentClientDto.endDate ? new Date(createAgentClientDto.endDate) : null,
                commission: createAgentClientDto.commission,
                contract: createAgentClientDto.contract
            },
            include: {
                agent: true,
                player: true
            }
        });
    }

    async findAll(search: PaginationDto): Promise<PaginatedResponse<AgentClient>> {
        const { skip, take } = search;
        const total = await this.prisma.agentClient.count();
        const agentClients = await this.prisma.agentClient.findMany({
            skip,
            take,
            include: {
                agent: true,
                player: true
            }
        });
        return {
            data: agentClients,
            meta: {
                total,
                skip: skip || 0,
                take: take || 10,
                hasMore: (skip || 0) + (take || 10) < total
            }
        };
    }

    async findOne(id: number): Promise<AgentClient> {
        const agentClient = await this.prisma.agentClient.findUnique({
            where: { id },
            include: {
                agent: true,
                player: true
            }
        });

        if (!agentClient) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${id} غير موجودة`);
        }

        return agentClient;
    }

    async findByAgent(agentId: number): Promise<AgentClient[]> {
        const agentClient = await this.prisma.agentClient.findMany({
            where: { agentId },
            include: {
                agent: true,
                player: true
            }
        });

        if (!agentClient) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${agentId} غير موجودة`);
        }

        return agentClient;
    }

    async findByClient(playerId: number): Promise<AgentClient[]> {
        const agentClient = await this.prisma.agentClient.findMany({
            where: { playerId },
            include: {
                agent: true,
                player: true
            }
        });

        if (!agentClient) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${playerId} غير موجودة`);
        }

        return agentClient;
    }

    async findByStatus(status: ClientStatus): Promise<AgentClient[]> {
        const agentClient = await this.prisma.agentClient.findMany({
            where: { status },
            include: {
                agent: true,
                player: true
            }
        });

        if (!agentClient) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${status} غير موجودة`);
        }

        return agentClient;
    }

    async update(id: number, updateAgentClientDto: UpdateAgentClientDto): Promise<AgentClient> {
        try {
            return await this.prisma.agentClient.update({
                where: { id },
                data: {
                    status: updateAgentClientDto.status,
                    startDate: updateAgentClientDto.startDate ? new Date(updateAgentClientDto.startDate) : undefined,
                    endDate: updateAgentClientDto.endDate ? new Date(updateAgentClientDto.endDate) : undefined,
                    commission: updateAgentClientDto.commission,
                    contract: updateAgentClientDto.contract
                },
                include: {
                    agent: true,
                    player: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number): Promise<AgentClient> {
        try {
            return await this.prisma.agentClient.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${id} غير موجودة`);
        }
    }
} 