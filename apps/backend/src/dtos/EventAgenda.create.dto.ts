import { ApiProperty } from "@nestjs/swagger";
import { Event } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for EventAgenda
export class CreateEventAgendaDto {
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

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location?: string;

  @ApiProperty({ type: "string" })
  // Field: speaker, Type: string
  @Column()
  speaker?: string;
}
