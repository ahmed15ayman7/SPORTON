import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { ReactionEntity } from "./Reaction.entity";
import { EngagementMetricsEntity } from "./EngagementMetrics.entity";
import { User, Reaction, EngagementMetrics } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Post
export class PostEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: text, Type: string
  @Column()
  text: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: video, Type: string
  @Column()
  video?: string;

  @ApiProperty({ type: "boolean" })
  // Field: isAchievement, Type: boolean
  @Column()
  isAchievement: boolean;

  @ApiProperty({ type: UserEntity })
  // Field: author, Type: User
  @Column()
  author: User;

  @ApiProperty({ type: "number" })
  // Field: authorId, Type: number
  @Column()
  authorId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: ReactionEntity })
  // Field: reactions, Type: Reaction[]
  @Column()
  reactions: Reaction[];

  @ApiProperty({ type: ReactionEntity })
  // Field: Reaction, Type: Reaction[]
  @Column()
  Reaction: Reaction[];

  @ApiProperty({ type: EngagementMetricsEntity })
  // Field: EngagementMetrics, Type: EngagementMetrics[]
  @Column()
  EngagementMetrics: EngagementMetrics[];
}
