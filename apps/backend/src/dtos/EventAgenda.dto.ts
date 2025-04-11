import { ApiProperty } from "@nestjs/swagger";
import { EventEntity } from "./Event.entity";
import { Event } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for EventAgenda
export class EventAgendaDto {
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
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startTime, Type: Date
  @Column()
  startTime: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endTime, Type: Date
  @Column()
  endTime: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: location, Type: string
  @Column()
  location?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: speaker, Type: string
  @Column()
  speaker?: string;
}
