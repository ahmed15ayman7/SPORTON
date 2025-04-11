import { ApiProperty } from "@nestjs/swagger";
import { Competition, User, ParticipationStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for CompetitionParticipant
export class CreateCompetitionParticipantDto {
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

  @ApiProperty({ type: "number" })
  // Field: rank, Type: number
  @Column()
  rank?: number;

  @ApiProperty({ type: "number" })
  // Field: score, Type: number
  @Column()
  score?: number;
}
