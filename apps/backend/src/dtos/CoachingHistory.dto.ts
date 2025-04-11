import { ApiProperty } from "@nestjs/swagger";
import { CoachEntity } from "./Coach.entity";
import { ClubEntity } from "./Club.entity";
import { Coach, Club } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for CoachingHistory
export class CoachingHistoryDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: CoachEntity })
  // Field: coach, Type: Coach
  @Column()
  coach: Coach;

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId: number;

  @ApiProperty({ type: ClubEntity })
  // Field: club, Type: Club
  @Column()
  club: Club;

  @ApiProperty({ type: "number" })
  // Field: clubId, Type: number
  @Column()
  clubId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
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
