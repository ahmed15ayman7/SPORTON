import { ApiProperty } from "@nestjs/swagger";
import { EventEntity } from "./Event.entity";
import { UserEntity } from "./User.entity";
import { Event, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for EventSponsor
export class EventSponsorEntity {
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
  // Field: sponsor, Type: User
  @Column()
  sponsor: User;

  @ApiProperty({ type: "number" })
  // Field: sponsorId, Type: number
  @Column()
  sponsorId: number;

  @ApiProperty({ type: "string" })
  // Field: sponsorshipType, Type: string
  @Column()
  sponsorshipType: string;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;
}
