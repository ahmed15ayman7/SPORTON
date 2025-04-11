import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { AdTargetingEntity } from "./AdTargeting.entity";
import { TargetingPerformanceEntity } from "./TargetingPerformance.entity";
import { User, AdTargeting, TargetingPerformance } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for UserSegment
export class UserSegmentEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: criteria, Type: object
  @Column()
  criteria: object;

  @ApiProperty({ type: UserEntity })
  // Field: users, Type: User[]
  @Column()
  users: User[];

  @ApiProperty({ type: "number" })
  // Field: priority, Type: number
  @Column()
  priority: number;

  @ApiProperty({ type: AdTargetingEntity })
  // Field: AdTargeting, Type: AdTargeting[]
  @Column()
  AdTargeting: AdTargeting[];

  @ApiProperty({ type: TargetingPerformanceEntity })
  // Field: TargetingPerformance, Type: TargetingPerformance[]
  @Column()
  TargetingPerformance: TargetingPerformance[];
}
