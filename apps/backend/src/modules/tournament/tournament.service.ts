import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@Injectable()
export class TournamentService {
    constructor(private prisma: PrismaService) { }

    async create(createTournamentDto: CreateTournamentDto) {
        return this.prisma.tournament.create({
            data: {
                name: createTournamentDto.name,
                description: createTournamentDto.description,
                startDate: createTournamentDto.startDate,
                endDate: createTournamentDto.endDate,
                facilityId: createTournamentDto.facilityId,
                teamCategoryId: createTournamentDto.teamCategoryId,
                maxTeams: createTournamentDto.maxTeams,
                rules: createTournamentDto.rules,
                prizes: createTournamentDto.prizes,
                entryFee: createTournamentDto.entryFee,
                notes: createTournamentDto.notes
            },
            include: {
                facility: true,
                teamCategory: true
            }
        });
    }

    async findAll() {
        return this.prisma.tournament.findMany({
            include: {
                facility: true,
                teamCategory: true
            }
        });
    }

    async findOne(id: number) {
        const tournament = await this.prisma.tournament.findUnique({
            where: { id },
            include: {
                facility: true,
                teamCategory: true
            }
        });

        if (!tournament) {
            throw new NotFoundException(`البطولة رقم ${id} غير موجودة`);
        }

        return tournament;
    }

    async findByFacility(facilityId: number) {
        return this.prisma.tournament.findMany({
            where: { facilityId },
            include: {
                facility: true,
                teamCategory: true
            }
        });
    }

    async findByTeamCategory(teamCategoryId: number) {
        return this.prisma.tournament.findMany({
            where: { teamCategoryId },
            include: {
                facility: true,
                teamCategory: true
            }
        });
    }

    async findByDateRange(startDate: Date, endDate: Date) {
        return this.prisma.tournament.findMany({
            where: {
                AND: [
                    { startDate: { lte: endDate } },
                    { endDate: { gte: startDate } }
                ]
            },
            include: {
                facility: true,
                teamCategory: true
            }
        });
    }

    async update(id: number, updateTournamentDto: UpdateTournamentDto) {
        try {
            return await this.prisma.tournament.update({
                where: { id },
                data: {
                    name: updateTournamentDto.name,
                    description: updateTournamentDto.description,
                    startDate: updateTournamentDto.startDate,
                    endDate: updateTournamentDto.endDate,
                    facilityId: updateTournamentDto.facilityId,
                    teamCategoryId: updateTournamentDto.teamCategoryId,
                    maxTeams: updateTournamentDto.maxTeams,
                    rules: updateTournamentDto.rules,
                    prizes: updateTournamentDto.prizes,
                    entryFee: updateTournamentDto.entryFee,
                    notes: updateTournamentDto.notes
                },
                include: {
                    facility: true,
                    teamCategory: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`البطولة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.tournament.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`البطولة رقم ${id} غير موجودة`);
        }
    }
} 