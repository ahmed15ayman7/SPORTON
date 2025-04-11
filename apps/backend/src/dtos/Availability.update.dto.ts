import { ApiProperty } from "@nestjs/swagger";
import { User, AvailabilityStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Availability
export class UpdateAvailabilityDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: AvailabilityStatus })
  // Field: status, Type: AvailabilityStatus
  @Column()
  status: AvailabilityStatus;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: fromDate, Type: Date
  @Column()
  fromDate?: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: toDate, Type: Date
  @Column()
  toDate?: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: notes, Type: string
  @Column()
  notes?: string;
}
