import { ApiProperty } from "@nestjs/swagger";
import { User, AvailabilityStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Availability
export class CreateAvailabilityDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: AvailabilityStatus })
  // Field: status, Type: AvailabilityStatus
  @Column()
  status: AvailabilityStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: fromDate, Type: Date
  @Column()
  fromDate?: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: toDate, Type: Date
  @Column()
  toDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: notes, Type: string
  @Column()
  notes?: string;
}
