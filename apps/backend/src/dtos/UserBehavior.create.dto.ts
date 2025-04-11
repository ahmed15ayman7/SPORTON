import { ApiProperty } from "@nestjs/swagger";
import { User, InteractionType, ContentType } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for UserBehavior
export class CreateUserBehaviorDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: InteractionType })
  // Field: interactionType, Type: InteractionType
  @Column()
  interactionType: InteractionType;

  @ApiProperty({ enum: ContentType })
  // Field: contentType, Type: ContentType
  @Column()
  contentType: ContentType;

  @ApiProperty({ type: "number" })
  // Field: contentId, Type: number
  @Column()
  contentId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: timestamp, Type: Date
  @Column()
  timestamp: Date;

  @ApiProperty({ type: "number" })
  // Field: timeSpent, Type: number
  @Column()
  timeSpent?: number;

  @ApiProperty({ type: "number" })
  // Field: score, Type: number
  @Column()
  score: number;

  @ApiProperty({ type: "number" })
  // Field: sessionDuration, Type: number
  @Column()
  sessionDuration?: number;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: deviceInfo, Type: object
  @Column()
  deviceInfo?: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: location, Type: object
  @Column()
  location?: object;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: timeOfDay, Type: Date
  @Column()
  timeOfDay: Date;

  @ApiProperty({ type: "number" })
  // Field: dayOfWeek, Type: number
  @Column()
  dayOfWeek: number;

  @ApiProperty({ type: "boolean" })
  // Field: isPositive, Type: boolean
  @Column()
  isPositive: boolean;
}
