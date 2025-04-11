import { ApiProperty } from "@nestjs/swagger";
import { User, Category, Comment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Article
export class CreateArticleDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: "number" })
  // Field: authorId, Type: number
  @Column()
  authorId: number;

  @ApiProperty({ type: "string" })
  // Field: tags, Type: string[]
  @Column()
  tags: string[];

  @ApiProperty({ type: "string" })
  // Field: thumbnail, Type: string
  @Column()
  thumbnail?: string;

  @ApiProperty({ type: "number" })
  // Field: views, Type: number
  @Column()
  views: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
