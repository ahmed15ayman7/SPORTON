import { ApiProperty } from "@nestjs/swagger";
import { Event, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for EventSponsor
export class CreateEventSponsorDto {
  @ApiProperty({ type: "number" })
  // Field: eventId, Type: number
  @Column()
  eventId: number;

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
