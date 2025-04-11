import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { CategoryEntity } from "./Category.entity";
import { CommentEntity } from "./Comment.entity";
import { User, Category, Comment } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Article
export class ArticleEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ type: UserEntity })
  // Field: author, Type: User
  @Column()
  author: User;

  @ApiProperty({ type: "number" })
  // Field: authorId, Type: number
  @Column()
  authorId: number;

  @ApiProperty({ type: CategoryEntity })
  // Field: categories, Type: Category[]
  @Column()
  categories: Category[];

  @ApiProperty({ type: "string" })
  // Field: tags, Type: string[]
  @Column()
  tags: string[];

  @ApiProperty({ type: "string", nullable: true })
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

  @ApiProperty({ type: CommentEntity })
  // Field: comments, Type: Comment[]
  @Column()
  comments: Comment[];
}
