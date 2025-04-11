import { ApiProperty } from "@nestjs/swagger";
import { ContentType } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for ContentScore
export class UpdateContentScoreDto {
  @ApiProperty({ type: "number" })
  // Field: contentId, Type: number
  @Column()
  contentId: number;

  @ApiProperty({ enum: ContentType })
  // Field: contentType, Type: ContentType
  @Column()
  contentType: ContentType;

  @ApiProperty({ type: "string" })
  // Field: userSegment, Type: string
  @Column()
  userSegment: string;

  @ApiProperty({ type: "number" })
  // Field: relevanceScore, Type: number
  @Column()
  relevanceScore: number;

  @ApiProperty({ type: "number" })
  // Field: freshness, Type: number
  @Column()
  freshness: number;

  @ApiProperty({ type: "number" })
  // Field: quality, Type: number
  @Column()
  quality: number;

  @ApiProperty({ type: "number" })
  // Field: engagement, Type: number
  @Column()
  engagement: number;

  @ApiProperty({ type: "number" })
  // Field: finalScore, Type: number
  @Column()
  finalScore: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: lastCalculated, Type: Date
  @Column()
  lastCalculated: Date;
}
