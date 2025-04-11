import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { TrainingVideoEntity } from "./TrainingVideo.entity";
import { TrainingReviewEntity } from "./TrainingReview.entity";
import { TrainingCategoryEntity } from "./TrainingCategory.entity";
import { CoachEntity } from "./Coach.entity";
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
// This is the  Entity for Training
export class TrainingDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: UserEntity })
  // Field: coach, Type: User
  @Column()
  coach: User;

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId: number;

  @ApiProperty({ type: UserEntity })
  // Field: players, Type: User[]
  @Column()
  players: User[];

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

  @ApiProperty({ type: TrainingVideoEntity })
  // Field: videos, Type: TrainingVideo[]
  @Column()
  videos: TrainingVideo[];

  @ApiProperty({ type: TrainingReviewEntity })
  // Field: reviews, Type: TrainingReview[]
  @Column()
  reviews: TrainingReview[];

  @ApiProperty({ type: TrainingCategoryEntity })
  // Field: categories, Type: TrainingCategory[]
  @Column()
  categories: TrainingCategory[];

  @ApiProperty({ type: CoachEntity })
  // Field: Coach, Type: Coach[]
  @Column()
  Coach: Coach[];
}
