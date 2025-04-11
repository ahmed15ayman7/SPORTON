import { ApiProperty } from "@nestjs/swagger";
import { CompetitionParticipantEntity } from "./CompetitionParticipant.entity";
import { CompetitionRoundEntity } from "./CompetitionRound.entity";
import { PrizeEntity } from "./Prize.entity";
import {
  Sport,
  CompetitionFormat,
  CompetitionParticipant,
  CompetitionRound,
  Prize,
  CompetitionStatus,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Competition
export class CompetitionEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ enum: Sport })
  // Field: sport, Type: Sport
  @Column()
  sport: Sport;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ enum: CompetitionFormat })
  // Field: format, Type: CompetitionFormat
  @Column()
  format: CompetitionFormat;

  @ApiProperty({ type: CompetitionParticipantEntity })
  // Field: participants, Type: CompetitionParticipant[]
  @Column()
  participants: CompetitionParticipant[];

  @ApiProperty({ type: CompetitionRoundEntity })
  // Field: rounds, Type: CompetitionRound[]
  @Column()
  rounds: CompetitionRound[];

  @ApiProperty({ type: PrizeEntity })
  // Field: prizes, Type: Prize[]
  @Column()
  prizes: Prize[];

  @ApiProperty({ type: "string", nullable: true })
  // Field: rules, Type: string
  @Column()
  rules?: string;

  @ApiProperty({ enum: CompetitionStatus })
  // Field: status, Type: CompetitionStatus
  @Column()
  status: CompetitionStatus;
}
