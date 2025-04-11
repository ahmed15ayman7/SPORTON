import { ApiProperty } from "@nestjs/swagger";
import { EventEntity } from "./Event.entity";
import { Event } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for EventImage
export class EventImageDto {
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

  @ApiProperty({ type: "string" })
  // Field: url, Type: string
  @Column()
  url: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "boolean" })
  // Field: isMain, Type: boolean
  @Column()
  isMain: boolean;
}
