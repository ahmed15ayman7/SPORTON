import { ApiProperty } from "@nestjs/swagger";
import { PostEntity } from "./Post.entity";
import { ContentType, Post } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for EngagementMetrics
export class EngagementMetricsEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "number" })
  // Field: contentId, Type: number
  @Column()
  contentId: number;

  @ApiProperty({ enum: ContentType })
  // Field: contentType, Type: ContentType
  @Column()
  contentType: ContentType;

  @ApiProperty({ type: "number" })
  // Field: viewCount, Type: number
  @Column()
  viewCount: number;

  @ApiProperty({ type: "number" })
  // Field: avgTimeSpent, Type: number
  @Column()
  avgTimeSpent: number;

  @ApiProperty({ type: "number" })
  // Field: engagementRate, Type: number
  @Column()
  engagementRate: number;

  @ApiProperty({ type: "number" })
  // Field: bounceRate, Type: number
  @Column()
  bounceRate: number;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: peakHours, Type: object
  @Column()
  peakHours: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: demographics, Type: object
  @Column()
  demographics: object;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: PostEntity })
  // Field: content, Type: Post
  @Column()
  content: Post;
}
