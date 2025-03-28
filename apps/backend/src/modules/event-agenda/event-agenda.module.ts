import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventAgendaController } from './event-agenda.controller';
import { EventAgendaService } from './event-agenda.service';

@Module({
    imports: [PrismaModule],
    controllers: [EventAgendaController],
    providers: [EventAgendaService],
    exports: [EventAgendaService],
})
export class EventAgendaModule { } 