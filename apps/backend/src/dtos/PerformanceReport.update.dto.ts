import { ApiProperty } from "@nestjs/swagger";
import { User, Coach } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for PerformanceReport
export class UpdatePerformanceReportDto {
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

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId: number;
}
