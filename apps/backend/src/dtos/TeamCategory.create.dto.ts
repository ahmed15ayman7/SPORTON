import { ApiProperty } from "@nestjs/swagger";
import {
  Club,
  Coach,
  Player,
  TrainingSchedule,
  Tournament,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for TeamCategory
export class CreateTeamCategoryDto {
  @ApiProperty({ type: "number" })
  // Field: clubId, Type: number
  @Column()
  clubId: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: ageGroup, Type: string
  @Column()
  ageGroup?: string;

  @ApiProperty({ type: "number" })
  // Field: minAge, Type: number
  @Column()
  minAge?: number;

  @ApiProperty({ type: "number" })
  // Field: maxAge, Type: number
  @Column()
  maxAge?: number;

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId?: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
