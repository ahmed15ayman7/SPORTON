import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeamCategoryDto } from './dto/create-team-category.dto';
import { UpdateTeamCategoryDto } from './dto/update-team-category.dto';
import { TeamCategory } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { Prisma } from '@shared/prisma';
@Injectable()
export class TeamCategoryService extends BaseService<TeamCategory> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'teamCategory');
    }

    async create(createTeamCategoryDto: TeamCategory): Promise<TeamCategory> {
        return this.prisma.teamCategory.create({
            data: {
                name: createTeamCategoryDto.name,
                clubId: createTeamCategoryDto.clubId,
                ageGroup: createTeamCategoryDto.ageGroup,
                coachId: createTeamCategoryDto.coachId,
                minAge: createTeamCategoryDto.minAge,
                maxAge: createTeamCategoryDto.maxAge,
            }
        });
    }

    async findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<TeamCategory>> {
        const { take, skip, search } = paginationDto;
        const where: Prisma.TeamCategoryWhereInput = {};

        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }

        const [data, total] = await this.prisma.$transaction([
            this.prisma.teamCategory.findMany({
                where,
                skip,
                take,
                orderBy: { id: 'desc' }
            }),
            this.prisma.teamCategory.count({ where })
        ]);

        return { data, meta: { total: total || 0, skip: skip || 0, take: take || 0, hasMore: (skip || 0) + (take || 0) < total } };
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

    async update(id: number, updateTeamCategoryDto: TeamCategory) {
        try {
            return await this.prisma.teamCategory.update({
                where: { id },
                data: {
                    name: updateTeamCategoryDto.name,
                    minAge: updateTeamCategoryDto.minAge,
                    maxAge: updateTeamCategoryDto.maxAge,
                    coachId: updateTeamCategoryDto.coachId,
                    clubId: updateTeamCategoryDto.clubId,
                    ageGroup: updateTeamCategoryDto.ageGroup,
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