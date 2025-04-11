import { ApiProperty } from "@nestjs/swagger";
import { CompetitionEntity } from "./Competition.entity";
import { Competition, RoundStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for CompetitionRound
export class CompetitionRoundEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: CompetitionEntity })
  // Field: competition, Type: Competition
  @Column()
  competition: Competition;

  @ApiProperty({ type: "number" })
  // Field: competitionId, Type: number
  @Column()
  competitionId: number;

  @ApiProperty({ type: "number" })
  // Field: roundNumber, Type: number
  @Column()
  roundNumber: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ enum: RoundStatus })
  // Field: status, Type: RoundStatus
  @Column()
  status: RoundStatus;
}
