import { PartialType } from '@nestjs/swagger';
import { CreateContentScoreDto } from './create-content-score.dto';

export class UpdateContentScoreDto extends PartialType(CreateContentScoreDto) { } 