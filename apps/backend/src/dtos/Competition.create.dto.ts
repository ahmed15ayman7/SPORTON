import { ApiProperty } from "@nestjs/swagger";
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
// This is the Create Entity for Competition
export class CreateCompetitionDto {
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

  @ApiProperty({ type: "string" })
  // Field: rules, Type: string
  @Column()
  rules?: string;

  @ApiProperty({ enum: CompetitionStatus })
  // Field: status, Type: CompetitionStatus
  @Column()
  status: CompetitionStatus;
}
