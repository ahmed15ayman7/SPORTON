import { ApiProperty } from "@nestjs/swagger";
import { ScoutEntity } from "./Scout.entity";
import { PlayerEntity } from "./Player.entity";
import { Scout, Player, DiscoveryStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for PlayerDiscovery
export class PlayerDiscoveryDto {
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

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;

  @ApiProperty({ type: "string" })
  // Field: context, Type: string
  @Column()
  context: string;

  @ApiProperty({ type: "string" })
  // Field: initialReport, Type: string
  @Column()
  initialReport: string;

  @ApiProperty({ enum: DiscoveryStatus })
  // Field: status, Type: DiscoveryStatus
  @Column()
  status: DiscoveryStatus;

  @ApiProperty({ type: "string", nullable: true })
  // Field: outcome, Type: string
  @Column()
  outcome?: string;
}
