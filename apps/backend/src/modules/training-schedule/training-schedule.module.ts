import { Module } from '@nestjs/common';
import { TrainingScheduleService } from './training-schedule.service';
import { TrainingScheduleController } from './training-schedule.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TrainingScheduleController],
    providers: [TrainingScheduleService],
    exports: [TrainingScheduleService],
})
export class TrainingScheduleModule { } 