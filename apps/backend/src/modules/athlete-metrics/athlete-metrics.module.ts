import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AthleteMetricsController } from './athlete-metrics.controller';
import { AthleteMetricsService } from './athlete-metrics.service';

@Module({
    imports: [PrismaModule],
    controllers: [AthleteMetricsController],
    providers: [AthleteMetricsService],
    exports: [AthleteMetricsService],
})
export class AthleteMetricsModule { } 