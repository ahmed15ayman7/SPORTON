import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { CoachEntity } from "./Coach.entity";
import { User, Coach } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for PerformanceReport
export class PerformanceReportEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: athlete, Type: User
  @Column()
  athlete: User;

  @ApiProperty({ type: "number" })
  // Field: athleteId, Type: number
  @Column()
  athleteId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: metrics, Type: object
  @Column()
  metrics: object;

  @ApiProperty({ type: "string", nullable: true })
  // Field: analysis, Type: string
  @Column()
  analysis?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: recommendations, Type: string
  @Column()
  recommendations?: string;

  @ApiProperty({ type: UserEntity })
  // Field: coach, Type: User
  @Column()
  coach: User;

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId: number;

  @ApiProperty({ type: CoachEntity })
  // Field: Coach, Type: Coach[]
  @Column()
  Coach: Coach[];
}
