import { ApiProperty } from "@nestjs/swagger";
import { EventEntity } from "./Event.entity";
import { Event } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for EventCategory
export class EventCategoryDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: EventEntity })
  // Field: events, Type: Event[]
  @Column()
  events: Event[];
}
