import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CampaignAnalyticsController } from './campaign-analytics.controller';
import { CampaignAnalyticsService } from './campaign-analytics.service';

@Module({
    imports: [PrismaModule],
    controllers: [CampaignAnalyticsController],
    providers: [CampaignAnalyticsService],
    exports: [CampaignAnalyticsService],
})
export class CampaignAnalyticsModule { } 