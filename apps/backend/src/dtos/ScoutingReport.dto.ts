import { ApiProperty } from "@nestjs/swagger";
import { ScoutEntity } from "./Scout.entity";
import { PlayerEntity } from "./Player.entity";
import { MatchEntity } from "./Match.entity";
import { Scout, Player, Match } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for ScoutingReport
export class ScoutingReportDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: ScoutEntity })
  // Field: scout, Type: Scout
  @Column()
  scout: Scout;

  @ApiProperty({ type: "number" })
  // Field: scoutId, Type: number
  @Column()
  scoutId: number;

  @ApiProperty({ type: PlayerEntity })
  // Field: player, Type: Player
  @Column()
  player: Player;

  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: MatchEntity, nullable: true })
  // Field: match, Type: Match
  @Column()
  match?: Match;

  @ApiProperty({ type: "number", nullable: true })
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

  @ApiProperty({ type: "string", nullable: true })
  // Field: notes, Type: string
  @Column()
  notes?: string;
}
