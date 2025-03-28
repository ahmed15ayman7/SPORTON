import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ContentAnalyticsController } from './content-analytics.controller';
import { ContentAnalyticsService } from './content-analytics.service';

@Module({
    imports: [PrismaModule],
    controllers: [ContentAnalyticsController],
    providers: [ContentAnalyticsService],
    exports: [ContentAnalyticsService],
})
export class ContentAnalyticsModule { } 