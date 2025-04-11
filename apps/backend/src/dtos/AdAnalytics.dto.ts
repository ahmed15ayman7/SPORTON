import { ApiProperty } from "@nestjs/swagger";
import { AdvertisementEntity } from "./Advertisement.entity";
import { Advertisement } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for AdAnalytics
export class AdAnalyticsDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: AdvertisementEntity })
  // Field: advertisement, Type: Advertisement
  @Column()
  advertisement: Advertisement;

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
