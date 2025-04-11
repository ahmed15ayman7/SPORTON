import { ApiProperty } from "@nestjs/swagger";
import {
  TeamCategory,
  TrainingScheduleStatus,
  Coach,
  Facility,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for TrainingSchedule
export class CreateTrainingScheduleDto {
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

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId?: number;

  @ApiProperty({ type: "number" })
  // Field: facilityId, Type: number
  @Column()
  facilityId?: number;
}
