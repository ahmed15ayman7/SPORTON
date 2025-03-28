import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Training } from '@prisma/client';

@Injectable()
export class TrainingsService extends BaseService<Training> {
    constructor(prisma: PrismaService) {
        super(prisma, 'training');
    }

    protected getSearchFields(): string[] {
        return ['title', 'description', 'location'];
    }

    protected getIncludeFields(): object {
        return {
            coach: true,
            players: true,
            videos: true,
            reviews: true,
            categories: true,
        };
    }

    async getTrainingProfile(id: number): Promise<Training> {
        const training = await this.prisma.training.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!training) {
            throw new NotFoundException('التدريب غير موجود');
        }
        return training;
    }

    async getCoachTrainings(coachId: number): Promise<Training[]> {
        const trainings = await this.prisma.training.findMany({
            where: { coachId },
            include: this.getIncludeFields(),
        });
        return trainings;
    }

    async getPlayerTrainings(playerId: number): Promise<Training[]> {
        const trainings = await this.prisma.training.findMany({
            where: {
                players: {
                    some: {
                        id: playerId,
                    },
                },
            },
            include: this.getIncludeFields(),
        });
        return trainings;
    }

    async addPlayerToTraining(trainingId: number, playerId: number): Promise<Training> {
        const training = await this.prisma.training.update({
            where: { id: trainingId },
            data: {
                players: {
                    connect: { id: playerId },
                },
            },
            include: this.getIncludeFields(),
        });
        return training;
    }

    async removePlayerFromTraining(trainingId: number, playerId: number): Promise<Training> {
        const training = await this.prisma.training.update({
            where: { id: trainingId },
            data: {
                players: {
                    disconnect: { id: playerId },
                },
            },
            include: this.getIncludeFields(),
        });
        return training;
    }

    async isPlayerInTraining(trainingId: number, playerId: number): Promise<boolean> {
        const training = await this.prisma.training.findFirst({
            where: {
                id: trainingId,
                players: {
                    some: {
                        id: playerId,
                    },
                },
            },
        });
        return !!training;
    }
} 