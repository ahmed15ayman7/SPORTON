import { ApiProperty } from "@nestjs/swagger";
import { Product, ProductCategory } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for ProductCategory
export class CreateProductCategoryDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "number" })
  // Field: parentId, Type: number
  @Column()
  parentId?: number;
}
