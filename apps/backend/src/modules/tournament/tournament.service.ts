import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { Tournament, TournamentType } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class TournamentService {
    constructor(private prisma: PrismaService) { }

    async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
        return this.prisma.tournament.create({
            data: {
                name: createTournamentDto.name,
                startDate: createTournamentDto.startDate,
                endDate: createTournamentDto.endDate,
                type: createTournamentDto.type,
                organizerId: createTournamentDto.organizerId,
                rules: createTournamentDto.rules,
                prizes: createTournamentDto.prizes,
                status: createTournamentDto.status
            },
            include: {
                teams: true,
                matches: true
            }
        });
    }

    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Tournament>> {
        const { take, skip, search } = paginationDto;
        const where: Prisma.TournamentWhereInput = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            ];
        }

        const tournaments = await this.prisma.tournament.findMany({
            where,
            include: {
                teams: true,
                matches: true
            },
            skip,
            take
        });

        const total = await this.prisma.tournament.count({ where });

        return {
            data: tournaments,
            meta: {
                total,
                skip: skip || 0,
                take: take || 10,
                hasMore: (skip || 0) + (take || 10) < total,
            }
        };
    }

    async findOne(id: number): Promise<Tournament> {
        const tournament = await this.prisma.tournament.findUnique({
            where: { id },
            include: {
                teams: true,
                matches: true
            }
        });

        if (!tournament) {
            throw new NotFoundException(`البطولة رقم ${id} غير موجودة`);
        }

        return tournament;
    }

    async findByOrganizer(organizerId: number): Promise<Tournament[]> {
        return this.prisma.tournament.findMany({
            where: { organizerId },
            include: {
                teams: true,
                matches: true
            }
        });
    }

    async findByType(type: TournamentType): Promise<Tournament[]> {
        return this.prisma.tournament.findMany({
            where: { type },
            include: {
                teams: true,
                matches: true
            }
        });
    }

    async findByDateRange(startDate: Date, endDate: Date): Promise<Tournament[]> {
        return this.prisma.tournament.findMany({
            where: {
                AND: [
                    { startDate: { lte: endDate } },
                    { endDate: { gte: startDate } }
                ]
            },
            include: {
                teams: true,
                matches: true
            }
        });
    }

    async update(id: number, updateTournamentDto: UpdateTournamentDto): Promise<Tournament> {
        try {
            return await this.prisma.tournament.update({
                where: { id },
                data: {
                    name: updateTournamentDto.name,
                    startDate: updateTournamentDto.startDate,
                    endDate: updateTournamentDto.endDate,
                    type: updateTournamentDto.type,
                    organizerId: updateTournamentDto.organizerId,
                    rules: updateTournamentDto.rules,
                    prizes: updateTournamentDto.prizes,
                    status: updateTournamentDto.status
                },
                include: {
                    teams: true,
                    matches: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`البطولة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number): Promise<Tournament> {
        try {
            return await this.prisma.tournament.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`البطولة رقم ${id} غير موجودة`);
        }
    }
} 