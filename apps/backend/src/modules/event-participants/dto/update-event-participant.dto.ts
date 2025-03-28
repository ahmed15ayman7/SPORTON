import { PartialType } from '@nestjs/swagger';
import { CreateEventParticipantDto } from './create-event-participant.dto';

export class UpdateEventParticipantDto extends PartialType(CreateEventParticipantDto) { } 