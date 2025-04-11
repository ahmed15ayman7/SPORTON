import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { PlayerEntity } from "./Player.entity";
import { CoachEntity } from "./Coach.entity";
import { User, Player, Coach } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Achievement
export class AchievementDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: details, Type: string
  @Column()
  details?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: PlayerEntity })
  // Field: Player, Type: Player[]
  @Column()
  Player: Player[];

  @ApiProperty({ type: CoachEntity })
  // Field: Coach, Type: Coach[]
  @Column()
  Coach: Coach[];
}
