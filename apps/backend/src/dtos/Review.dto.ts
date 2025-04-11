import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Review
export class ReviewDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: reviewer, Type: User
  @Column()
  reviewer: User;

  @ApiProperty({ type: "number" })
  // Field: reviewerId, Type: number
  @Column()
  reviewerId: number;

  @ApiProperty({ type: UserEntity })
  // Field: reviewed, Type: User
  @Column()
  reviewed: User;

  @ApiProperty({ type: "number" })
  // Field: reviewedId, Type: number
  @Column()
  reviewedId: number;

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
