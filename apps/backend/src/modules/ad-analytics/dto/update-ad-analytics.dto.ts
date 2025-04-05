import { PartialType } from '@nestjs/swagger';
import { CreateAdAnalyticsDto } from './create-ad-analytics.dto';

export class UpdateAdAnalyticsDto extends PartialType(CreateAdAnalyticsDto) { } 