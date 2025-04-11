import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  License,
  CoachingHistory,
  Training,
  Achievement,
  PerformanceReport,
  TeamCategory,
  TrainingSchedule,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Coach
export class UpdateCoachDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "string" })
  // Field: specialization, Type: string[]
  @Column()
  specialization: string[];

  @ApiProperty({ type: "number" })
  // Field: experience, Type: number
  @Column()
  experience: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: methodology, Type: string
  @Column()
  methodology?: string;
}
