import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  TrainingLevel,
  TrainingVideo,
  TrainingReview,
  TrainingCategory,
  Coach,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Training
export class UpdateTrainingDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "number" })
  // Field: capacity, Type: number
  @Column()
  capacity: number;

  @ApiProperty({ enum: TrainingLevel })
  // Field: level, Type: TrainingLevel
  @Column()
  level: TrainingLevel;

  @ApiProperty({ type: "number", nullable: true })
  // Field: price, Type: number
  @Column()
  price?: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: requirements, Type: string
  @Column()
  requirements?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: equipment, Type: string
  @Column()
  equipment?: string;
}
