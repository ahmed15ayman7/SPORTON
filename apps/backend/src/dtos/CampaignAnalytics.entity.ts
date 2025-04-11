import { ApiProperty } from "@nestjs/swagger";
import { CampaignEntity } from "./Campaign.entity";
import { Campaign } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for CampaignAnalytics
export class CampaignAnalyticsEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: CampaignEntity })
  // Field: campaign, Type: Campaign
  @Column()
  campaign: Campaign;

  @ApiProperty({ type: "number" })
  // Field: campaignId, Type: number
  @Column()
  campaignId: number;

  @ApiProperty({ type: "number" })
  // Field: totalReach, Type: number
  @Column()
  totalReach: number;

  @ApiProperty({ type: "number" })
  // Field: engagement, Type: number
  @Column()
  engagement: number;

  @ApiProperty({ type: "number" })
  // Field: conversions, Type: number
  @Column()
  conversions: number;

  @ApiProperty({ type: "number" })
  // Field: roi, Type: number
  @Column()
  roi: number;
}
