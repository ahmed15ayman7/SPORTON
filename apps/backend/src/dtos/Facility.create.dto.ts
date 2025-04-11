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
// This is the Create Entity for Facility
export class CreateFacilityDto {
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

  @ApiProperty({ type: "number" })
  // Field: capacity, Type: number
  @Column()
  capacity?: number;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location?: string;

  @ApiProperty({ type: "string" })
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
