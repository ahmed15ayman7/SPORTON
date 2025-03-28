import { PartialType } from '@nestjs/swagger';
import { CreateContentAnalyticsDto } from './create-content-analytics.dto';

export class UpdateContentAnalyticsDto extends PartialType(CreateContentAnalyticsDto) { } 