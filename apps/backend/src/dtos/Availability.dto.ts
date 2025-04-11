import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User, AvailabilityStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Availability
export class AvailabilityDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

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
