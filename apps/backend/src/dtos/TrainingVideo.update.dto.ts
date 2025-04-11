import { ApiProperty } from "@nestjs/swagger";
import { Training } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for TrainingVideo
export class UpdateTrainingVideoDto {
  @ApiProperty({ type: "number" })
  // Field: trainingId, Type: number
  @Column()
  trainingId: number;

  @ApiProperty({ type: "string" })
  // Field: url, Type: string
  @Column()
  url: string;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;
}
