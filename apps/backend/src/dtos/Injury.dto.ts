import { ApiProperty } from "@nestjs/swagger";
import { PlayerEntity } from "./Player.entity";
import { Player, InjurySeverity, InjuryStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Injury
export class InjuryDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: PlayerEntity })
  // Field: player, Type: Player
  @Column()
  player: Player;

  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ enum: InjurySeverity })
  // Field: severity, Type: InjurySeverity
  @Column()
  severity: InjurySeverity;

  @ApiProperty({ type: "string", nullable: true })
  // Field: treatment, Type: string
  @Column()
  treatment?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: medicalReport, Type: string
  @Column()
  medicalReport?: string;

  @ApiProperty({ enum: InjuryStatus })
  // Field: status, Type: InjuryStatus
  @Column()
  status: InjuryStatus;

  @ApiProperty({ type: "string", nullable: true })
  // Field: doctor, Type: string
  @Column()
  doctor?: string;
}
