import { ApiProperty } from "@nestjs/swagger";
import { Coach, Club } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for CoachingHistory
export class CreateCoachingHistoryDto {
  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId: number;

  @ApiProperty({ type: "number" })
  // Field: clubId, Type: number
  @Column()
  clubId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: position, Type: string
  @Column()
  position: string;

  @ApiProperty({ type: "string" })
  // Field: achievements, Type: string[]
  @Column()
  achievements: string[];
}
