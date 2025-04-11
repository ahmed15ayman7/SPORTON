import { ApiProperty } from "@nestjs/swagger";
import { User, Article } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Comment
export class CreateCommentDto {
  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: "number" })
  // Field: authorId, Type: number
  @Column()
  authorId: number;

  @ApiProperty({ type: "number" })
  // Field: articleId, Type: number
  @Column()
  articleId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
