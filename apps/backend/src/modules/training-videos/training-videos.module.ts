import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TrainingVideosController } from './training-videos.controller';
import { TrainingVideosService } from './training-videos.service';

@Module({
    imports: [PrismaModule],
    controllers: [TrainingVideosController],
    providers: [TrainingVideosService],
    exports: [TrainingVideosService],
})
export class TrainingVideosModule { } 