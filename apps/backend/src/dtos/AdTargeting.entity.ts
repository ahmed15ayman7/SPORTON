import { ApiProperty } from "@nestjs/swagger";
import { AdvertisementEntity } from "./Advertisement.entity";
import { UserSegmentEntity } from "./UserSegment.entity";
import { TargetingPerformanceEntity } from "./TargetingPerformance.entity";
import {
  Advertisement,
  UserSegment,
  TargetingPerformance,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for AdTargeting
export class AdTargetingEntity {
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

  @ApiProperty({ type: "string" })
  // Field: targetInterests, Type: string[]
  @Column()
  targetInterests: string[];

  @ApiProperty({ type: "string" })
  // Field: targetBehaviors, Type: string[]
  @Column()
  targetBehaviors: string[];

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: demographicData, Type: object
  @Column()
  demographicData?: object;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: locationData, Type: object
  @Column()
  locationData?: object;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: timeTargeting, Type: object
  @Column()
  timeTargeting?: object;

  @ApiProperty({ type: "number" })
  // Field: performanceScore, Type: number
  @Column()
  performanceScore: number;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: optimizationRules, Type: object
  @Column()
  optimizationRules?: object;

  @ApiProperty({ type: "string" })
  // Field: bidStrategy, Type: string
  @Column()
  bidStrategy: string;

  @ApiProperty({ type: "number" })
  // Field: budget, Type: number
  @Column()
  budget: number;

  @ApiProperty({ type: "number" })
  // Field: minPerformanceScore, Type: number
  @Column()
  minPerformanceScore: number;

  @ApiProperty({ type: UserSegmentEntity })
  // Field: targetSegments, Type: UserSegment[]
  @Column()
  targetSegments: UserSegment[];

  @ApiProperty({ type: "string" })
  // Field: blacklist, Type: string[]
  @Column()
  blacklist: string[];

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: customRules, Type: object
  @Column()
  customRules?: object;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: TargetingPerformanceEntity })
  // Field: TargetingPerformance, Type: TargetingPerformance[]
  @Column()
  TargetingPerformance: TargetingPerformance[];
}
