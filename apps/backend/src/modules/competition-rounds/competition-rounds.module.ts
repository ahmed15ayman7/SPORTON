import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CompetitionRoundsController } from './competition-rounds.controller';
import { CompetitionRoundsService } from './competition-rounds.service';

@Module({
    imports: [PrismaModule],
    controllers: [CompetitionRoundsController],
    providers: [CompetitionRoundsService],
    exports: [CompetitionRoundsService],
})
export class CompetitionRoundsModule { } 