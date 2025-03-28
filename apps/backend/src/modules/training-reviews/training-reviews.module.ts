import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TrainingReviewsController } from './training-reviews.controller';
import { TrainingReviewsService } from './training-reviews.service';

@Module({
    imports: [PrismaModule],
    controllers: [TrainingReviewsController],
    providers: [TrainingReviewsService],
    exports: [TrainingReviewsService],
})
export class TrainingReviewsModule { } 