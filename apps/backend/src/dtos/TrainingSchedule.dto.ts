import { ApiProperty } from "@nestjs/swagger";
import { TeamCategoryEntity } from "./TeamCategory.entity";
import { CoachEntity } from "./Coach.entity";
import { FacilityEntity } from "./Facility.entity";
import {
  TeamCategory,
  TrainingScheduleStatus,
  Coach,
  Facility,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TrainingSchedule
export class TrainingScheduleDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: TeamCategoryEntity })
  // Field: team, Type: TeamCategory
  @Column()
  team: TeamCategory;

  @ApiProperty({ type: "number" })
  // Field: teamId, Type: number
  @Column()
  teamId: number;

  @ApiProperty({ type: "number" })
  // Field: dayOfWeek, Type: number
  @Column()
  dayOfWeek: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startTime, Type: Date
  @Column()
  startTime: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endTime, Type: Date
  @Column()
  endTime: Date;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;

  @ApiProperty({ enum: TrainingScheduleStatus })
  // Field: status, Type: TrainingScheduleStatus
  @Column()
  status: TrainingScheduleStatus;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: CoachEntity, nullable: true })
  // Field: coach, Type: Coach
  @Column()
  coach?: Coach;

  @ApiProperty({ type: "number", nullable: true })
  // Field: coachId, Type: number
  @Column()
  coachId?: number;

  @ApiProperty({ type: FacilityEntity, nullable: true })
  // Field: facility, Type: Facility
  @Column()
  facility?: Facility;

  @ApiProperty({ type: "number", nullable: true })
  // Field: facilityId, Type: number
  @Column()
  facilityId?: number;
}
