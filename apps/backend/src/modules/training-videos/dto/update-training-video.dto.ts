import { PartialType } from '@nestjs/swagger';
import { CreateTrainingVideoDto } from './create-training-video.dto';

export class UpdateTrainingVideoDto extends PartialType(CreateTrainingVideoDto) { } 