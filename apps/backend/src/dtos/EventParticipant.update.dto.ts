import { ApiProperty } from "@nestjs/swagger";
import { Event, User, ParticipationStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for EventParticipant
export class UpdateEventParticipantDto {
  @ApiProperty({ type: "number" })
  // Field: eventId, Type: number
  @Column()
  eventId: number;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: ParticipationStatus })
  // Field: status, Type: ParticipationStatus
  @Column()
  status: ParticipationStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: registeredAt, Type: Date
  @Column()
  registeredAt: Date;
}
