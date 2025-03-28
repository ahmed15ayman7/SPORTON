import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TrainingCategoriesController } from './training-categories.controller';
import { TrainingCategoriesService } from './training-categories.service';

@Module({
    imports: [PrismaModule],
    controllers: [TrainingCategoriesController],
    providers: [TrainingCategoriesService],
    exports: [TrainingCategoriesService],
})
export class TrainingCategoriesModule { } 