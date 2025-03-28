import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDiscoveryDto } from './dto/create-player-discovery.dto';
import { UpdatePlayerDiscoveryDto } from './dto/update-player-discovery.dto';

@Injectable()
export class PlayerDiscoveryService {
    constructor(private prisma: PrismaService) { }

    async create(createPlayerDiscoveryDto: CreatePlayerDiscoveryDto) {
        return this.prisma.playerDiscovery.create({
            data: createPlayerDiscoveryDto,
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async findAll() {
        return this.prisma.playerDiscovery.findMany({
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async findOne(id: number) {
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

    async findByScout(scoutId: number) {
        return this.prisma.playerDiscovery.findMany({
            where: { scoutId },
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async findByPlayer(playerId: number) {
        return this.prisma.playerDiscovery.findMany({
            where: { playerId },
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async findByStatus(status: string) {
        return this.prisma.playerDiscovery.findMany({
            where: { status },
            include: {
                scout: true,
                player: true,
            },
        });
    }

    async update(id: number, updatePlayerDiscoveryDto: UpdatePlayerDiscoveryDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.playerDiscovery.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`اكتشاف اللاعب رقم ${id} غير موجود`);
        }
    }
} 