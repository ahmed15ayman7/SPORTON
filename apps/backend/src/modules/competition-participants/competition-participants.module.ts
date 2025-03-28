import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CompetitionParticipantsController } from './competition-participants.controller';
import { CompetitionParticipantsService } from './competition-participants.service';

@Module({
    imports: [PrismaModule],
    controllers: [CompetitionParticipantsController],
    providers: [CompetitionParticipantsService],
    exports: [CompetitionParticipantsService],
})
export class CompetitionParticipantsModule { } 