import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "./Product.entity";
import { Product } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for ProductImage
export class ProductImageEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: ProductEntity })
  // Field: product, Type: Product
  @Column()
  product: Product;

  @ApiProperty({ type: "number" })
  // Field: productId, Type: number
  @Column()
  productId: number;

  @ApiProperty({ type: "string" })
  // Field: url, Type: string
  @Column()
  url: string;

  @ApiProperty({ type: "boolean" })
  // Field: isMain, Type: boolean
  @Column()
  isMain: boolean;

  @ApiProperty({ type: "number" })
  // Field: order, Type: number
  @Column()
  order: number;
}
