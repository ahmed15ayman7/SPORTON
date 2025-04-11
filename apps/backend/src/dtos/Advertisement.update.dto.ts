import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  Sport,
  Role,
  AdStatus,
  AgeRange,
  AdAnalytics,
  Campaign,
  AdTargeting,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Advertisement
export class UpdateAdvertisementDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: url, Type: string
  @Column()
  url?: string;

  @ApiProperty({ type: "number" })
  // Field: sponsorId, Type: number
  @Column()
  sponsorId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ enum: Sport })
  // Field: targetSports, Type: Sport[]
  @Column()
  targetSports: Sport[];

  @ApiProperty({ enum: Role })
  // Field: targetRoles, Type: Role[]
  @Column()
  targetRoles: Role[];

  @ApiProperty({ type: "number" })
  // Field: clicks, Type: number
  @Column()
  clicks: number;

  @ApiProperty({ type: "number" })
  // Field: impressions, Type: number
  @Column()
  impressions: number;

  @ApiProperty({ type: "number" })
  // Field: budget, Type: number
  @Column()
  budget: number;

  @ApiProperty({ enum: AdStatus })
  // Field: status, Type: AdStatus
  @Column()
  status: AdStatus;

  @ApiProperty({ type: "string", nullable: true })
  // Field: targetLocation, Type: string
  @Column()
  targetLocation?: string;

  @ApiProperty({ enum: AgeRange, nullable: true })
  // Field: targetAge, Type: AgeRange
  @Column()
  targetAge?: AgeRange;

  @ApiProperty({ type: "number", nullable: true })
  // Field: campaignId, Type: number
  @Column()
  campaignId?: number;

  @ApiProperty({ type: "string" })
  // Field: keywords, Type: string[]
  @Column()
  keywords: string[];

  @ApiProperty({ type: "number", nullable: true })
  // Field: maxBudgetPerDay, Type: number
  @Column()
  maxBudgetPerDay?: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
