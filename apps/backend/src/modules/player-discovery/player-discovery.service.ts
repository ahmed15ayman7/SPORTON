import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlayerDiscoveryDto } from '@/dtos/PlayerDiscovery.create.dto';
import { UpdatePlayerDiscoveryDto } from '@/dtos/PlayerDiscovery.update.dto';
import { PlayerDiscovery, DiscoveryStatus } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseService } from '@/common/services/base.service';
@Injectable()
export class PlayerDiscoveryService extends BaseService<PlayerDiscovery> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'playerDiscovery');
    }

    async create(createPlayerDiscoveryDto: CreatePlayerDiscoveryDto): Promise<PlayerDiscovery> {
        return this.prisma.playerDiscovery.create({
            data: {
                ...createPlayerDiscoveryDto,
                status: DiscoveryStatus.PENDING,
                date: new Date(),
                context: 'initial',
                initialReport: 'initial',
            },
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<PlayerDiscovery>> {
        const { skip, take } = query;
        const playerDiscoveries = await this.prisma.playerDiscovery.findMany({
            skip,
            take,
            include: {
                scout: true,
                player: true,
            },
        });
        return {
            data: playerDiscoveries,
            meta: {
                total: playerDiscoveries.length,
                skip: skip || 0,
                take: take || 10,
                hasMore: playerDiscoveries.length === take,
            },
        };
    }

    async findOne(id: number): Promise<PlayerDiscovery> {
        const discovery = await this.prisma.playerDiscovery.findUnique({
            where: { id },
            include: {
                scout: true,
                player: true,
            },
        });

        if (!discovery) {
            throw new NotFoundException(`اكتشاف اللاعب رقم ${id} غير موجود`);
        }

        return discovery;
    }

    async findByScout(scoutId: number): Promise<PlayerDiscovery[]> {
        return this.prisma.playerDiscovery.findMany({
            where: { scoutId },
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async findByPlayer(playerId: number): Promise<PlayerDiscovery[]> {
        return this.prisma.playerDiscovery.findMany({
            where: { playerId },
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async findByStatus(status: DiscoveryStatus): Promise<PlayerDiscovery[]> {
        return this.prisma.playerDiscovery.findMany({
            where: { status },
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async update(id: number, updatePlayerDiscoveryDto: UpdatePlayerDiscoveryDto): Promise<PlayerDiscovery> {
        try {
            return await this.prisma.playerDiscovery.update({
                where: { id },
                data: updatePlayerDiscoveryDto,
                include: {
                    scout: true,
                    player: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`اكتشاف اللاعب رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<PlayerDiscovery> {
        try {
            return await this.prisma.playerDiscovery.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`اكتشاف اللاعب رقم ${id} غير موجود`);
        }
    }
} 