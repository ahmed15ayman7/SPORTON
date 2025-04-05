import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfessionalAchievementDto } from './dto/create-professional-achievement.dto';
import { UpdateProfessionalAchievementDto } from './dto/update-professional-achievement.dto';
import { ProfessionalAchievement } from '@prisma/client';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
@Injectable()
export class ProfessionalAchievementService {
    constructor(private prisma: PrismaService) { }

    async create(createProfessionalAchievementDto: CreateProfessionalAchievementDto): Promise<ProfessionalAchievement> {
        return this.prisma.professionalAchievement.create({
            data: {
                user: { connect: { id: createProfessionalAchievementDto.userId } },
                title: createProfessionalAchievementDto.title,
                organization: createProfessionalAchievementDto.organization,
                date: createProfessionalAchievementDto.date,
                proof: createProfessionalAchievementDto.proof,
                verified: createProfessionalAchievementDto.verified,
            },
            include: {
                user: true,
            },
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<ProfessionalAchievement>> {
        const { skip, take } = params;
        const total = await this.prisma.professionalAchievement.count();
        const data = await this.prisma.professionalAchievement.findMany({
            skip,
            take,
            include: {
                user: true,
            },
        });
        return { data, meta: { total, skip: skip || 0, take: take || 10, hasMore: (skip || 0) + (take || 10) < total } };
    }

    async findOne(id: number): Promise<ProfessionalAchievement> {
        const achievement = await this.prisma.professionalAchievement.findUnique({
            where: { id },
            include: {
                user: true,
            },
        });

        if (!achievement) {
            throw new NotFoundException(`الإنجاز المهني رقم ${id} غير موجود`);
        }

        return achievement;
    }

    async findByUser(userId: number): Promise<ProfessionalAchievement[]> {
        return this.prisma.professionalAchievement.findMany({
            where: { userId },
            include: {
                user: true,
            },
        });
    }

    async update(id: number, updateProfessionalAchievementDto: UpdateProfessionalAchievementDto): Promise<ProfessionalAchievement> {
        try {
            return await this.prisma.professionalAchievement.update({
                where: { id },
                data: updateProfessionalAchievementDto,
                include: {
                    user: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`الإنجاز المهني رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<ProfessionalAchievement> {
        try {
            return await this.prisma.professionalAchievement.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`الإنجاز المهني رقم ${id} غير موجود`);
        }
    }

    async verify(id: number): Promise<ProfessionalAchievement> {
        try {
            return await this.prisma.professionalAchievement.update({
                where: { id },
                data: { verified: true },
                include: {
                    user: true,
                },
            });
        } catch (error) {
            throw new NotFoundException(`الإنجاز المهني رقم ${id} غير موجود`);
        }
    }
} 