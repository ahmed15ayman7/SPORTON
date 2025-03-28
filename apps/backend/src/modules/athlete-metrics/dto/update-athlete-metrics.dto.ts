import { PartialType } from '@nestjs/swagger';
import { CreateAthleteMetricsDto } from './create-athlete-metrics.dto';

export class UpdateAthleteMetricsDto extends PartialType(CreateAthleteMetricsDto) { } 