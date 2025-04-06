import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TrainingVideosService } from './training-videos.service';
import { TrainingVideo } from '@shared/prisma';
import { BaseController } from '@/common/controllers/base.controller';

@Controller('training-videos')
export class TrainingVideosController extends BaseController<TrainingVideo> {
    constructor(private readonly trainingVideosService: TrainingVideosService) {
        super(trainingVideosService);
    }

    @Get(':id')
    async getTrainingVideoProfile(@Param('id') id: string): Promise<TrainingVideo> {
        return this.trainingVideosService.getTrainingVideoProfile(parseInt(id));
    }

    @Get('training/:id')
    async getTrainingVideos(@Param('id') id: string): Promise<TrainingVideo[]> {
        return this.trainingVideosService.getTrainingVideos(parseInt(id));
    }

    @Post()
    async createTrainingVideo(@Body() trainingVideo: TrainingVideo): Promise<TrainingVideo> {
        return this.trainingVideosService.create(trainingVideo);
    }

    @Put(':id')
    async updateTrainingVideo(@Param('id') id: string, @Body() trainingVideo: TrainingVideo): Promise<TrainingVideo> {
        return this.trainingVideosService.update(parseInt(id), trainingVideo);
    }

    @Delete(':id')
    async deleteTrainingVideo(@Param('id') id: string): Promise<TrainingVideo> {
        return this.trainingVideosService.delete(parseInt(id));
    }
}
