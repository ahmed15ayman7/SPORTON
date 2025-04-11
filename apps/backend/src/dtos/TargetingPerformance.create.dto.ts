import { ApiProperty } from "@nestjs/swagger";
import { AdTargeting, UserSegment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for TargetingPerformance
export class CreateTargetingPerformanceDto {
  @ApiProperty({ type: "number" })
  // Field: targetingId, Type: number
  @Column()
  targetingId: number;

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
