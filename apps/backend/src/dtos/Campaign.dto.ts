import { ApiProperty } from "@nestjs/swagger";
import { AdvertisementEntity } from "./Advertisement.entity";
import { CampaignAnalyticsEntity } from "./CampaignAnalytics.entity";
import {
  CampaignStatus,
  Advertisement,
  CampaignAnalytics,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Campaign
export class CampaignDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ type: "number" })
  // Field: budget, Type: number
  @Column()
  budget: number;

  @ApiProperty({ enum: CampaignStatus })
  // Field: status, Type: CampaignStatus
  @Column()
  status: CampaignStatus;

  @ApiProperty({ type: AdvertisementEntity })
  // Field: advertisements, Type: Advertisement[]
  @Column()
  advertisements: Advertisement[];

  @ApiProperty({ type: CampaignAnalyticsEntity, nullable: true })
  // Field: analytics, Type: CampaignAnalytics
  @Column()
  analytics?: CampaignAnalytics;
}
