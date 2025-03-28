import { Module } from '@nestjs/common';
import { PlayerStatisticsService } from './player-statistics.service';
import { PlayerStatisticsController } from './player-statistics.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PlayerStatisticsController],
    providers: [PlayerStatisticsService],
    exports: [PlayerStatisticsService],
})
export class PlayerStatisticsModule { } 