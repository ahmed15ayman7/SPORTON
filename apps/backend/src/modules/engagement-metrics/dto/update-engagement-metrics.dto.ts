import { PartialType } from '@nestjs/swagger';
import { CreateEngagementMetricsDto } from './create-engagement-metrics.dto';

export class UpdateEngagementMetricsDto extends PartialType(CreateEngagementMetricsDto) { } 