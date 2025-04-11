import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "./Product.entity";
import { Product, ProductCategory } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for ProductCategory
export class ProductCategoryEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

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

  @ApiProperty({ type: ProductEntity })
  // Field: products, Type: Product[]
  @Column()
  products: Product[];

  @ApiProperty({ type: ProductCategoryEntity, nullable: true })
  // Field: parent, Type: ProductCategory
  @Column()
  parent?: ProductCategory;

  @ApiProperty({ type: "number", nullable: true })
  // Field: parentId, Type: number
  @Column()
  parentId?: number;

  @ApiProperty({ type: ProductCategoryEntity })
  // Field: subCategories, Type: ProductCategory[]
  @Column()
  subCategories: ProductCategory[];
}
