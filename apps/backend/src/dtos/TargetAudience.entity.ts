import { ApiProperty } from "@nestjs/swagger";
import { ContentAnalyticsEntity } from "./ContentAnalytics.entity";
import {
  ContentAnalytics,
  Sport,
  Role,
  AgeRange,
  Gender,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TargetAudience
export class TargetAudienceEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: ContentAnalyticsEntity })
  // Field: contentAnalytics, Type: ContentAnalytics
  @Column()
  contentAnalytics: ContentAnalytics;

  @ApiProperty({ type: "number" })
  // Field: analyticsId, Type: number
  @Column()
  analyticsId: number;

  @ApiProperty({ enum: Sport })
  // Field: sport, Type: Sport
  @Column()
  sport: Sport;

  @ApiProperty({ enum: Role })
  // Field: role, Type: Role
  @Column()
  role: Role;

  @ApiProperty({ enum: AgeRange })
  // Field: ageRange, Type: AgeRange
  @Column()
  ageRange: AgeRange;

  @ApiProperty({ enum: Gender, nullable: true })
  // Field: gender, Type: Gender
  @Column()
  gender?: Gender;

  @ApiProperty({ type: "string" })
  // Field: interests, Type: string[]
  @Column()
  interests: string[];

  @ApiProperty({ type: "number" })
  // Field: weight, Type: number
  @Column()
  weight: number;
}
