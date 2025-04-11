import { ApiProperty } from "@nestjs/swagger";
import { EventEntity } from "./Event.entity";
import { Event } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for StreamingInfo
export class StreamingInfoDto {
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
  // Field: platform, Type: string
  @Column()
  platform: string;

  @ApiProperty({ type: "string" })
  // Field: url, Type: string
  @Column()
  url: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startTime, Type: Date
  @Column()
  startTime: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endTime, Type: Date
  @Column()
  endTime: Date;

  @ApiProperty({ type: "boolean" })
  // Field: isLive, Type: boolean
  @Column()
  isLive: boolean;
}
