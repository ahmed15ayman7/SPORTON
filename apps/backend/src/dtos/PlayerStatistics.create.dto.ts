import { ApiProperty } from "@nestjs/swagger";
import { Player } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for PlayerStatistics
export class CreatePlayerStatisticsDto {
  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: "number" })
  // Field: matches, Type: number
  @Column()
  matches: number;

  @ApiProperty({ type: "number" })
  // Field: goals, Type: number
  @Column()
  goals: number;

  @ApiProperty({ type: "number" })
  // Field: assists, Type: number
  @Column()
  assists: number;

  @ApiProperty({ type: "number" })
  // Field: yellowCards, Type: number
  @Column()
  yellowCards: number;

  @ApiProperty({ type: "number" })
  // Field: redCards, Type: number
  @Column()
  redCards: number;

  @ApiProperty({ type: "number" })
  // Field: minutesPlayed, Type: number
  @Column()
  minutesPlayed: number;

  @ApiProperty({ type: "number" })
  // Field: passAccuracy, Type: number
  @Column()
  passAccuracy?: number;

  @ApiProperty({ type: "number" })
  // Field: shotAccuracy, Type: number
  @Column()
  shotAccuracy?: number;

  @ApiProperty({ type: "number" })
  // Field: tackles, Type: number
  @Column()
  tackles: number;

  @ApiProperty({ type: "string" })
  // Field: season, Type: string
  @Column()
  season: string;
}
