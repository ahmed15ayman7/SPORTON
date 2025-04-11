import { ApiProperty } from "@nestjs/swagger";
import { EventEntity } from "./Event.entity";
import { CompetitionEntity } from "./Competition.entity";
import { Event, Competition } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Prize
export class PrizeEntity {
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

  @ApiProperty({ type: "number" })
  // Field: rank, Type: number
  @Column()
  rank: number;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: CompetitionEntity })
  // Field: Competition, Type: Competition[]
  @Column()
  Competition: Competition[];
}
