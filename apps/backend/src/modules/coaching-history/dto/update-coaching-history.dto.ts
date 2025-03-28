import { PartialType } from '@nestjs/swagger';
import { CreateCoachingHistoryDto } from './create-coaching-history.dto';

export class UpdateCoachingHistoryDto extends PartialType(CreateCoachingHistoryDto) { } 