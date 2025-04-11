import { ApiProperty } from "@nestjs/swagger";
import {
  CampaignStatus,
  Advertisement,
  CampaignAnalytics,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Campaign
export class CreateCampaignDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
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
}
