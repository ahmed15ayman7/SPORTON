import { ApiProperty } from "@nestjs/swagger";
import {
  ContentAnalytics,
  Sport,
  Role,
  AgeRange,
  Gender,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for TargetAudience
export class UpdateTargetAudienceDto {
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
