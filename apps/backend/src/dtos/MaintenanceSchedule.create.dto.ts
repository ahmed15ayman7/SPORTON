import { ApiProperty } from "@nestjs/swagger";
import { Facility } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for MaintenanceSchedule
export class CreateMaintenanceScheduleDto {
  @ApiProperty({ type: "number" })
  // Field: facilityId, Type: number
  @Column()
  facilityId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "number" })
  // Field: cost, Type: number
  @Column()
  cost?: number;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;
}
