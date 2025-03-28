import { PartialType } from '@nestjs/swagger';
import { CreateEventSponsorDto } from './create-event-sponsor.dto';

export class UpdateEventSponsorDto extends PartialType(CreateEventSponsorDto) { } 