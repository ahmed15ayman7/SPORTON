import { ApiProperty } from "@nestjs/swagger";
import { ContentType, TargetAudience } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for ContentAnalytics
export class CreateContentAnalyticsDto {
  @ApiProperty({ enum: ContentType })
  // Field: contentType, Type: ContentType
  @Column()
  contentType: ContentType;

  @ApiProperty({ type: "number" })
  // Field: contentId, Type: number
  @Column()
  contentId: number;

  @ApiProperty({ type: "string" })
  // Field: keywords, Type: string[]
  @Column()
  keywords: string[];

  @ApiProperty({ type: "string" })
  // Field: topics, Type: string[]
  @Column()
  topics: string[];

  @ApiProperty({ type: "number" })
  // Field: engagement, Type: number
  @Column()
  engagement: number;

  @ApiProperty({ type: "number" })
  // Field: relevanceScore, Type: number
  @Column()
  relevanceScore: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
