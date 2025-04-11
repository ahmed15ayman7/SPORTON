import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TrainingVideosService } from './training-videos.service';
import { TrainingVideo } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTrainingVideoDto } from '@/dtos/TrainingVideo.create.dto';
import { UpdateTrainingVideoDto } from '@/dtos/TrainingVideo.update.dto';

@Controller('training-videos')
export class TrainingVideosController extends BaseController<TrainingVideo> {
    constructor(private readonly trainingVideosService: TrainingVideosService) {
        super(trainingVideosService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء فيديو تدريب جديد', 'none', CreateTrainingVideoDto, null, 'فيديوهات التدريب')
    create(@Body() createTrainingVideoDto: CreateTrainingVideoDto) {
        return this.trainingVideosService.create(createTrainingVideoDto as TrainingVideo);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث فيديو تدريب محدد', 'none', UpdateTrainingVideoDto, null, 'فيديوهات التدريب')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.trainingVideosService.update(id, data);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على معلومات فيديو تدريب محدد', 'none', null, null, 'فيديوهات التدريب')
    async getTrainingVideoProfile(@Param('id') id: string): Promise<TrainingVideo> {
        return this.trainingVideosService.getTrainingVideoProfile(parseInt(id));
    }

    @Get('training/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فيديوهات تدريب محددة', 'none', null, null, 'فيديوهات التدريب')
    async getTrainingVideos(@Param('id') id: string): Promise<TrainingVideo[]> {
        return this.trainingVideosService.getTrainingVideos(parseInt(id));
    }



    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف فيديو تدريب محدد', 'none', null, null, 'فيديوهات التدريب')
    async remove(@Param('id') id: string): Promise<TrainingVideo> {
        return this.trainingVideosService.remove(parseInt(id));
    }
}
