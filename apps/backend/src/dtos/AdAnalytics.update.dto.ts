import { ApiProperty } from "@nestjs/swagger";
import { Advertisement } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for AdAnalytics
export class UpdateAdAnalyticsDto {
  @ApiProperty({ type: "number" })
  // Field: adId, Type: number
  @Column()
  adId: number;

  @ApiProperty({ type: "number" })
  // Field: conversions, Type: number
  @Column()
  conversions: number;

  @ApiProperty({ type: "number" })
  // Field: ctr, Type: number
  @Column()
  ctr: number;

  @ApiProperty({ type: "number" })
  // Field: engagement, Type: number
  @Column()
  engagement: number;

  @ApiProperty({ type: "number" })
  // Field: reach, Type: number
  @Column()
  reach: number;
}
