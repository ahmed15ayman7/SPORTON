import { Module } from '@nestjs/common';
import { AdAnalyticsController } from './ad-analytics.controller';
import { AdAnalyticsService } from './ad-analytics.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [AdAnalyticsController],
    providers: [AdAnalyticsService],
    exports: [AdAnalyticsService],
})
export class AdAnalyticsModule { } 