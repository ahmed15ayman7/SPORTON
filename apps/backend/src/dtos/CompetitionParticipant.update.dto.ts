import { ApiProperty } from "@nestjs/swagger";
import { Competition, User, ParticipationStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for CompetitionParticipant
export class UpdateCompetitionParticipantDto {
  @ApiProperty({ type: "number" })
  // Field: competitionId, Type: number
  @Column()
  competitionId: number;

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
