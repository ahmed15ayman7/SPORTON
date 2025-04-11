import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { LicenseEntity } from "./License.entity";
import { CoachingHistoryEntity } from "./CoachingHistory.entity";
import { TrainingEntity } from "./Training.entity";
import { AchievementEntity } from "./Achievement.entity";
import { PerformanceReportEntity } from "./PerformanceReport.entity";
import { TeamCategoryEntity } from "./TeamCategory.entity";
import { TrainingScheduleEntity } from "./TrainingSchedule.entity";
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
// This is the  Entity for Coach
export class CoachEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

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

  @ApiProperty({ type: LicenseEntity })
  // Field: licenses, Type: License[]
  @Column()
  licenses: License[];

  @ApiProperty({ type: "string", nullable: true })
  // Field: methodology, Type: string
  @Column()
  methodology?: string;

  @ApiProperty({ type: CoachingHistoryEntity })
  // Field: teams, Type: CoachingHistory[]
  @Column()
  teams: CoachingHistory[];

  @ApiProperty({ type: TrainingEntity })
  // Field: trainings, Type: Training[]
  @Column()
  trainings: Training[];

  @ApiProperty({ type: AchievementEntity })
  // Field: achievements, Type: Achievement[]
  @Column()
  achievements: Achievement[];

  @ApiProperty({ type: PerformanceReportEntity })
  // Field: PerformanceReport, Type: PerformanceReport[]
  @Column()
  PerformanceReport: PerformanceReport[];

  @ApiProperty({ type: TeamCategoryEntity })
  // Field: TeamCategory, Type: TeamCategory[]
  @Column()
  TeamCategory: TeamCategory[];

  @ApiProperty({ type: TrainingScheduleEntity })
  // Field: TrainingSchedule, Type: TrainingSchedule[]
  @Column()
  TrainingSchedule: TrainingSchedule[];
}
