import { ApiProperty } from "@nestjs/swagger";
import { User, Post } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Reaction
export class CreateReactionDto {
  @ApiProperty({ type: "string" })
  // Field: emoji, Type: string
  @Column()
  emoji: string;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number" })
  // Field: postId, Type: number
  @Column()
  postId: number;
}
