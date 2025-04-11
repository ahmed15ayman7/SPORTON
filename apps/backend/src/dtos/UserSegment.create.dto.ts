import { ApiProperty } from "@nestjs/swagger";
import { User, AdTargeting, TargetingPerformance } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for UserSegment
export class CreateUserSegmentDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: criteria, Type: object
  @Column()
  criteria: object;

  @ApiProperty({ type: "number" })
  // Field: priority, Type: number
  @Column()
  priority: number;
}
