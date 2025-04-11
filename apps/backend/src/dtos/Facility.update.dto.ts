import { ApiProperty } from "@nestjs/swagger";
import {
  Club,
  FacilityType,
  FacilityStatus,
  MaintenanceSchedule,
  TrainingSchedule,
  Player,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Facility
export class UpdateFacilityDto {
  @ApiProperty({ type: "number" })
  // Field: clubId, Type: number
  @Column()
  clubId: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ enum: FacilityType })
  // Field: type, Type: FacilityType
  @Column()
  type: FacilityType;

  @ApiProperty({ type: "number", nullable: true })
  // Field: capacity, Type: number
  @Column()
  capacity?: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: location, Type: string
  @Column()
  location?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: images, Type: string[]
  @Column()
  images: string[];

  @ApiProperty({ type: "string" })
  // Field: icon, Type: string
  @Column()
  icon: string;

  @ApiProperty({ enum: FacilityStatus })
  // Field: status, Type: FacilityStatus
  @Column()
  status: FacilityStatus;
}
