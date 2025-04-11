import { ApiProperty } from "@nestjs/swagger";
import { Product, OrderItem } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for ProductVariant
export class UpdateProductVariantDto {
  @ApiProperty({ type: "number" })
  // Field: productId, Type: number
  @Column()
  productId: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: size, Type: string
  @Column()
  size?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: color, Type: string
  @Column()
  color?: string;

  @ApiProperty({ type: "string" })
  // Field: sku, Type: string
  @Column()
  sku: string;

  @ApiProperty({ type: "number", nullable: true })
  // Field: price, Type: number
  @Column()
  price?: number;

  @ApiProperty({ type: "number" })
  // Field: inStock, Type: number
  @Column()
  inStock: number;
}
