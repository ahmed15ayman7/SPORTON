import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { ArticleEntity } from "./Article.entity";
import { User, Article } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Comment
export class CommentDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

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

  @ApiProperty({ type: ArticleEntity })
  // Field: article, Type: Article
  @Column()
  article: Article;

  @ApiProperty({ type: "number" })
  // Field: articleId, Type: number
  @Column()
  articleId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
