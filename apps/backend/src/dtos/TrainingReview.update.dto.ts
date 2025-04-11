import { ApiProperty } from "@nestjs/swagger";
import { Training, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for TrainingReview
export class UpdateTrainingReviewDto {
  @ApiProperty({ type: "number" })
  // Field: trainingId, Type: number
  @Column()
  trainingId: number;

  @ApiProperty({ type: "number" })
  // Field: reviewerId, Type: number
  @Column()
  reviewerId: number;

  @ApiProperty({ type: "number" })
  // Field: rating, Type: number
  @Column()
  rating: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: comment, Type: string
  @Column()
  comment?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
