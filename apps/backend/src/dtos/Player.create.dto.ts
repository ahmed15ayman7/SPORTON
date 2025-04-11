import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  Foot,
  Facility,
  Club,
  PlayerStatistics,
  Contract,
  Achievement,
  Injury,
  TeamCategory,
  AgentClient,
  Transfer,
  ScoutingReport,
  PlayerDiscovery,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Player
export class CreatePlayerDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: dateOfBirth, Type: Date
  @Column()
  dateOfBirth: Date;

  @ApiProperty({ type: "number" })
  // Field: height, Type: number
  @Column()
  height?: number;

  @ApiProperty({ type: "number" })
  // Field: weight, Type: number
  @Column()
  weight?: number;

  @ApiProperty({ type: "string" })
  // Field: position, Type: string
  @Column()
  position?: string;

  @ApiProperty({ enum: Foot })
  // Field: foot, Type: Foot
  @Column()
  foot?: Foot;

  @ApiProperty({ type: "number" })
  // Field: jerseyNumber, Type: number
  @Column()
  jerseyNumber?: number;

  @ApiProperty({ type: "number" })
  // Field: facilityId, Type: number
  @Column()
  facilityId: number;

  @ApiProperty({ type: "number" })
  // Field: marketValue, Type: number
  @Column()
  marketValue?: number;

  @ApiProperty({ type: "number" })
  // Field: currentTeamId, Type: number
  @Column()
  currentTeamId?: number;
}
