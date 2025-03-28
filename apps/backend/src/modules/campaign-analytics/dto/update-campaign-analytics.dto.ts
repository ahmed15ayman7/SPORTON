import { PartialType } from '@nestjs/swagger';
import { CreateCampaignAnalyticsDto } from './create-campaign-analytics.dto';

export class UpdateCampaignAnalyticsDto extends PartialType(CreateCampaignAnalyticsDto) { } 