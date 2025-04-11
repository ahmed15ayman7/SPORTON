import { ApiProperty } from "@nestjs/swagger";
import { CompetitionEntity } from "./Competition.entity";
import { UserEntity } from "./User.entity";
import { Competition, User, ParticipationStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for CompetitionParticipant
export class CompetitionParticipantDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: CompetitionEntity })
  // Field: competition, Type: Competition
  @Column()
  competition: Competition;

  @ApiProperty({ type: "number" })
  // Field: competitionId, Type: number
  @Column()
  competitionId: number;

  @ApiProperty({ type: UserEntity })
  // Field: participant, Type: User
  @Column()
  participant: User;

  @ApiProperty({ type: "number" })
  // Field: participantId, Type: number
  @Column()
  participantId: number;

  @ApiProperty({ enum: ParticipationStatus })
  // Field: status, Type: ParticipationStatus
  @Column()
  status: ParticipationStatus;

  @ApiProperty({ type: "number", nullable: true })
  // Field: rank, Type: number
  @Column()
  rank?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: score, Type: number
  @Column()
  score?: number;
}
