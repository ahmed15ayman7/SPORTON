import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Statistic
export class StatisticDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

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
