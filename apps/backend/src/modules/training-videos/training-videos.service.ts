import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TrainingVideo } from '@prisma/client';

@Injectable()
export class TrainingVideosService extends BaseService<TrainingVideo> {
    constructor(prisma: PrismaService) {
        super(prisma, 'trainingVideo');
    }

    protected getSearchFields(): string[] {
        return ['title', 'description'];
    }

    protected getIncludeFields(): object {
        return {
            training: true,
        };
    }

    async getTrainingVideoProfile(id: number): Promise<TrainingVideo> {
        const video = await this.prisma.trainingVideo.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!video) {
            throw new NotFoundException('فيديو التدريب غير موجود');
        }
        return video;
    }

    async getTrainingVideos(trainingId: number): Promise<TrainingVideo[]> {
        const videos = await this.prisma.trainingVideo.findMany({
            where: { trainingId },
            include: this.getIncludeFields(),
        });
        return videos;
    }
} 