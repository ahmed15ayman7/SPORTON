import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Statistic
export class UpdateStatisticDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number" })
  // Field: matchesPlayed, Type: number
  @Column()
  matchesPlayed: number;

  @ApiProperty({ type: "number" })
  // Field: goals, Type: number
  @Column()
  goals: number;

  @ApiProperty({ type: "number" })
  // Field: assists, Type: number
  @Column()
  assists: number;
}
