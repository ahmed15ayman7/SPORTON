import { ApiProperty } from "@nestjs/swagger";
import { User, Reaction, EngagementMetrics } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Post
export class CreatePostDto {
  @ApiProperty({ type: "string" })
  // Field: text, Type: string
  @Column()
  text: string;

  @ApiProperty({ type: "string" })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string" })
  // Field: video, Type: string
  @Column()
  video?: string;

  @ApiProperty({ type: "boolean" })
  // Field: isAchievement, Type: boolean
  @Column()
  isAchievement: boolean;

  @ApiProperty({ type: "number" })
  // Field: authorId, Type: number
  @Column()
  authorId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
