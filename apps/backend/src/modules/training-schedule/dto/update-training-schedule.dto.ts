import { PartialType } from '@nestjs/swagger';
import { CreateTrainingScheduleDto } from './create-training-schedule.dto';

export class UpdateTrainingScheduleDto extends PartialType(CreateTrainingScheduleDto) { } 