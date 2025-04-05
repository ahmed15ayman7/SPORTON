import { Module } from '@nestjs/common';
import { CoachingHistoryService } from './coaching-history.service';
import { CoachingHistoryController } from './coaching-history.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [CoachingHistoryController],
    providers: [CoachingHistoryService],
    exports: [CoachingHistoryService],
})
export class CoachingHistoryModule { } 