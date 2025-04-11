import { ApiProperty } from "@nestjs/swagger";
import { Product, ProductCategory } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for ProductCategory
export class UpdateProductCategoryDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "number", nullable: true })
  // Field: parentId, Type: number
  @Column()
  parentId?: number;
}
