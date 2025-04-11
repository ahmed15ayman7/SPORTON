import { ApiProperty } from "@nestjs/swagger";
import { Event, Competition } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Prize
export class CreatePrizeDto {
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

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description?: string;
}
