import { ApiProperty } from "@nestjs/swagger";
import { TrainingEntity } from "./Training.entity";
import { UserEntity } from "./User.entity";
import { Training, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TrainingReview
export class TrainingReviewEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: TrainingEntity })
  // Field: training, Type: Training
  @Column()
  training: Training;

  @ApiProperty({ type: "number" })
  // Field: trainingId, Type: number
  @Column()
  trainingId: number;

  @ApiProperty({ type: UserEntity })
  // Field: reviewer, Type: User
  @Column()
  reviewer: User;

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
