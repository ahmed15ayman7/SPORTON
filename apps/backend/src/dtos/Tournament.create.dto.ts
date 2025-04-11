import { ApiProperty } from "@nestjs/swagger";
import {
  Club,
  TournamentType,
  TeamCategory,
  Match,
  TournamentStatus,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Tournament
export class CreateTournamentDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "number" })
  // Field: organizerId, Type: number
  @Column()
  organizerId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ enum: TournamentType })
  // Field: type, Type: TournamentType
  @Column()
  type: TournamentType;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: prizes, Type: object
  @Column()
  prizes?: object;

  @ApiProperty({ type: "string" })
  // Field: rules, Type: string
  @Column()
  rules?: string;

  @ApiProperty({ enum: TournamentStatus })
  // Field: status, Type: TournamentStatus
  @Column()
  status: TournamentStatus;
}
