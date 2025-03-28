import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfessionalAchievementDto } from './dto/create-professional-achievement.dto';
import { UpdateProfessionalAchievementDto } from './dto/update-professional-achievement.dto';

@Injectable()
export class ProfessionalAchievementService {
    constructor(private prisma: PrismaService) { }

    async create(createProfessionalAchievementDto: CreateProfessionalAchievementDto) {
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

    async findAll() {
        return this.prisma.professionalAchievement.findMany({
            include: {
                user: true,
            },
        });
    }

    async findOne(id: number) {
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

    async findByUser(userId: number) {
        return this.prisma.professionalAchievement.findMany({
            where: { userId },
            include: {
                user: true,
            },
        });
    }

    async update(id: number, updateProfessionalAchievementDto: UpdateProfessionalAchievementDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.professionalAchievement.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`الإنجاز المهني رقم ${id} غير موجود`);
        }
    }

    async verify(id: number) {
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