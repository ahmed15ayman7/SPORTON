import { ApiProperty } from "@nestjs/swagger";
import { ArticleEntity } from "./Article.entity";
import { Article } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Category
export class CategoryEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: ArticleEntity })
  // Field: articles, Type: Article[]
  @Column()
  articles: Article[];
}
