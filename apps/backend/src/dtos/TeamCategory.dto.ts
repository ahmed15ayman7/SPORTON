import { ApiProperty } from "@nestjs/swagger";
import { ClubEntity } from "./Club.entity";
import { CoachEntity } from "./Coach.entity";
import { PlayerEntity } from "./Player.entity";
import { TrainingScheduleEntity } from "./TrainingSchedule.entity";
import { TournamentEntity } from "./Tournament.entity";
import {
  Club,
  Coach,
  Player,
  TrainingSchedule,
  Tournament,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TeamCategory
export class TeamCategoryDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: ClubEntity })
  // Field: club, Type: Club
  @Column()
  club: Club;

  @ApiProperty({ type: "number" })
  // Field: clubId, Type: number
  @Column()
  clubId: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: ageGroup, Type: string
  @Column()
  ageGroup?: string;

  @ApiProperty({ type: "number", nullable: true })
  // Field: minAge, Type: number
  @Column()
  minAge?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: maxAge, Type: number
  @Column()
  maxAge?: number;

  @ApiProperty({ type: CoachEntity, nullable: true })
  // Field: coach, Type: Coach
  @Column()
  coach?: Coach;

  @ApiProperty({ type: "number", nullable: true })
  // Field: coachId, Type: number
  @Column()
  coachId?: number;

  @ApiProperty({ type: PlayerEntity })
  // Field: players, Type: Player[]
  @Column()
  players: Player[];

  @ApiProperty({ type: TrainingScheduleEntity })
  // Field: schedule, Type: TrainingSchedule[]
  @Column()
  schedule: TrainingSchedule[];

  @ApiProperty({ type: TournamentEntity })
  // Field: competitions, Type: Tournament[]
  @Column()
  competitions: Tournament[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
