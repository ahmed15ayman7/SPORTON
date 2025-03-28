import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventParticipantsController } from './event-participants.controller';
import { EventParticipantsService } from './event-participants.service';

@Module({
    imports: [PrismaModule],
    controllers: [EventParticipantsController],
    providers: [EventParticipantsService],
    exports: [EventParticipantsService],
})
export class EventParticipantsModule { } 