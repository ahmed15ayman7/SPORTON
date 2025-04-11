import { ApiProperty } from "@nestjs/swagger";
import { AdTargetingEntity } from "./AdTargeting.entity";
import { UserSegmentEntity } from "./UserSegment.entity";
import { AdTargeting, UserSegment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TargetingPerformance
export class TargetingPerformanceDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: AdTargetingEntity })
  // Field: targeting, Type: AdTargeting
  @Column()
  targeting: AdTargeting;

  @ApiProperty({ type: "number" })
  // Field: targetingId, Type: number
  @Column()
  targetingId: number;

  @ApiProperty({ type: UserSegmentEntity })
  // Field: segment, Type: UserSegment
  @Column()
  segment: UserSegment;

  @ApiProperty({ type: "number" })
  // Field: segmentId, Type: number
  @Column()
  segmentId: number;

  @ApiProperty({ type: "number" })
  // Field: performance, Type: number
  @Column()
  performance: number;

  @ApiProperty({ type: "number" })
  // Field: cost, Type: number
  @Column()
  cost: number;

  @ApiProperty({ type: "number" })
  // Field: roi, Type: number
  @Column()
  roi: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;
}
