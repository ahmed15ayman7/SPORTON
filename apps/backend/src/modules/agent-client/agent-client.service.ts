import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAgentClientDto } from './dto/create-agent-client.dto';
import { UpdateAgentClientDto } from './dto/update-agent-client.dto';

@Injectable()
export class AgentClientService {
    constructor(private prisma: PrismaService) { }

    async create(createAgentClientDto: CreateAgentClientDto) {
        return this.prisma.agentClient.create({
            data: {
                agentId: createAgentClientDto.agentId,
                clientId: createAgentClientDto.clientId,
                status: createAgentClientDto.status,
                startDate: createAgentClientDto.startDate ? new Date(createAgentClientDto.startDate) : null,
                endDate: createAgentClientDto.endDate ? new Date(createAgentClientDto.endDate) : null,
                notes: createAgentClientDto.notes
            },
            include: {
                agent: true,
                client: true
            }
        });
    }

    async findAll() {
        return this.prisma.agentClient.findMany({
            include: {
                agent: true,
                client: true
            }
        });
    }

    async findOne(id: number) {
        const agentClient = await this.prisma.agentClient.findUnique({
            where: { id },
            include: {
                agent: true,
                client: true
            }
        });

        if (!agentClient) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${id} غير موجودة`);
        }

        return agentClient;
    }

    async findByAgent(agentId: number) {
        return this.prisma.agentClient.findMany({
            where: { agentId },
            include: {
                agent: true,
                client: true
            }
        });
    }

    async findByClient(clientId: number) {
        return this.prisma.agentClient.findMany({
            where: { clientId },
            include: {
                agent: true,
                client: true
            }
        });
    }

    async findByStatus(status: string) {
        return this.prisma.agentClient.findMany({
            where: { status },
            include: {
                agent: true,
                client: true
            }
        });
    }

    async update(id: number, updateAgentClientDto: UpdateAgentClientDto) {
        try {
            return await this.prisma.agentClient.update({
                where: { id },
                data: {
                    status: updateAgentClientDto.status,
                    startDate: updateAgentClientDto.startDate ? new Date(updateAgentClientDto.startDate) : undefined,
                    endDate: updateAgentClientDto.endDate ? new Date(updateAgentClientDto.endDate) : undefined,
                    notes: updateAgentClientDto.notes
                },
                include: {
                    agent: true,
                    client: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.agentClient.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`علاقة العميل والوكيل رقم ${id} غير موجودة`);
        }
    }
} 