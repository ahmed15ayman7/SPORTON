import { ApiProperty } from "@nestjs/swagger";
import { TrainingEntity } from "./Training.entity";
import { Training } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TrainingCategory
export class TrainingCategoryEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: TrainingEntity })
  // Field: trainings, Type: Training[]
  @Column()
  trainings: Training[];
}
