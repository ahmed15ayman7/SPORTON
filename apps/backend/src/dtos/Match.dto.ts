import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { TournamentEntity } from "./Tournament.entity";
import { ScoutingReportEntity } from "./ScoutingReport.entity";
import { User, Tournament, ScoutingReport } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Match
export class MatchDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: teamA, Type: string
  @Column()
  teamA: string;

  @ApiProperty({ type: "string" })
  // Field: teamB, Type: string
  @Column()
  teamB: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;

  @ApiProperty({ type: UserEntity })
  // Field: players, Type: User[]
  @Column()
  players: User[];

  @ApiProperty({ type: TournamentEntity })
  // Field: Tournament, Type: Tournament[]
  @Column()
  Tournament: Tournament[];

  @ApiProperty({ type: ScoutingReportEntity })
  // Field: ScoutingReport, Type: ScoutingReport[]
  @Column()
  ScoutingReport: ScoutingReport[];
}
