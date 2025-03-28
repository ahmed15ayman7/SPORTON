import { PartialType } from '@nestjs/swagger';
import { CreateEventAgendaDto } from './create-event-agenda.dto';

export class UpdateEventAgendaDto extends PartialType(CreateEventAgendaDto) { } 