import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EngagementMetricsController } from './engagement-metrics.controller';
import { EngagementMetricsService } from './engagement-metrics.service';

@Module({
    imports: [PrismaModule],
    controllers: [EngagementMetricsController],
    providers: [EngagementMetricsService],
    exports: [EngagementMetricsService],
})
export class EngagementMetricsModule { } 