import { ApiProperty } from "@nestjs/swagger";
import { EventEntity } from "./Event.entity";
import { UserEntity } from "./User.entity";
import { Event, User, ParticipationStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for EventParticipant
export class EventParticipantEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: EventEntity })
  // Field: event, Type: Event
  @Column()
  event: Event;

  @ApiProperty({ type: "number" })
  // Field: eventId, Type: number
  @Column()
  eventId: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

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
