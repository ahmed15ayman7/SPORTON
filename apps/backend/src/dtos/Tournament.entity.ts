import { ApiProperty } from "@nestjs/swagger";
import { ClubEntity } from "./Club.entity";
import { TeamCategoryEntity } from "./TeamCategory.entity";
import { MatchEntity } from "./Match.entity";
import {
  Club,
  TournamentType,
  TeamCategory,
  Match,
  TournamentStatus,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Tournament
export class TournamentEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: ClubEntity })
  // Field: organizer, Type: Club
  @Column()
  organizer: Club;

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

  @ApiProperty({ type: TeamCategoryEntity })
  // Field: teams, Type: TeamCategory[]
  @Column()
  teams: TeamCategory[];

  @ApiProperty({ type: MatchEntity })
  // Field: matches, Type: Match[]
  @Column()
  matches: Match[];

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: prizes, Type: object
  @Column()
  prizes?: object;

  @ApiProperty({ type: "string", nullable: true })
  // Field: rules, Type: string
  @Column()
  rules?: string;

  @ApiProperty({ enum: TournamentStatus })
  // Field: status, Type: TournamentStatus
  @Column()
  status: TournamentStatus;
}
