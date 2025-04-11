import { ApiProperty } from "@nestjs/swagger";
import { Scout, Player, Match } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for ScoutingReport
export class CreateScoutingReportDto {
  @ApiProperty({ type: "number" })
  // Field: scoutId, Type: number
  @Column()
  scoutId: number;

  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "number" })
  // Field: matchId, Type: number
  @Column()
  matchId?: number;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: technicalEvaluation, Type: object
  @Column()
  technicalEvaluation: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: physicalEvaluation, Type: object
  @Column()
  physicalEvaluation: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: mentalEvaluation, Type: object
  @Column()
  mentalEvaluation: object;

  @ApiProperty({ type: "number" })
  // Field: potential, Type: number
  @Column()
  potential: number;

  @ApiProperty({ type: "string" })
  // Field: recommendation, Type: string
  @Column()
  recommendation: string;

  @ApiProperty({ type: "string" })
  // Field: videos, Type: string[]
  @Column()
  videos: string[];

  @ApiProperty({ type: "string" })
  // Field: notes, Type: string
  @Column()
  notes?: string;
}
