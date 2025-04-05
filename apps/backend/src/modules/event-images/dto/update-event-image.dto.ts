import { PartialType } from '@nestjs/swagger';
import { CreateEventImageDto } from './create-event-image.dto';

export class UpdateEventImageDto extends PartialType(CreateEventImageDto) { } 