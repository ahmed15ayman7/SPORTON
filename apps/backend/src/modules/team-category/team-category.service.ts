import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamCategoryDto } from './dto/create-team-category.dto';
import { UpdateTeamCategoryDto } from './dto/update-team-category.dto';

@Injectable()
export class TeamCategoryService {
    constructor(private prisma: PrismaService) { }

    async create(createTeamCategoryDto: CreateTeamCategoryDto) {
        return this.prisma.teamCategory.create({
            data: {
                name: createTeamCategoryDto.name,
                description: createTeamCategoryDto.description,
                minAge: createTeamCategoryDto.minAge,
                maxAge: createTeamCategoryDto.maxAge,
                maxPlayers: createTeamCategoryDto.maxPlayers,
                notes: createTeamCategoryDto.notes
            }
        });
    }

    async findAll() {
        return this.prisma.teamCategory.findMany();
    }

    async findOne(id: number) {
        const teamCategory = await this.prisma.teamCategory.findUnique({
            where: { id }
        });

        if (!teamCategory) {
            throw new NotFoundException(`فئة الفريق رقم ${id} غير موجودة`);
        }

        return teamCategory;
    }

    async findByAgeRange(minAge: number, maxAge: number) {
        return this.prisma.teamCategory.findMany({
            where: {
                AND: [
                    { minAge: { lte: maxAge } },
                    { maxAge: { gte: minAge } }
                ]
            }
        });
    }

    async update(id: number, updateTeamCategoryDto: UpdateTeamCategoryDto) {
        try {
            return await this.prisma.teamCategory.update({
                where: { id },
                data: {
                    name: updateTeamCategoryDto.name,
                    description: updateTeamCategoryDto.description,
                    minAge: updateTeamCategoryDto.minAge,
                    maxAge: updateTeamCategoryDto.maxAge,
                    maxPlayers: updateTeamCategoryDto.maxPlayers,
                    notes: updateTeamCategoryDto.notes
                }
            });
        } catch (error) {
            throw new NotFoundException(`فئة الفريق رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.teamCategory.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`فئة الفريق رقم ${id} غير موجودة`);
        }
    }
} 