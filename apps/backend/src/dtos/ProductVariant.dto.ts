import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "./Product.entity";
import { OrderItemEntity } from "./OrderItem.entity";
import { Product, OrderItem } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for ProductVariant
export class ProductVariantDto {
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

  @ApiProperty({ type: OrderItemEntity })
  // Field: OrderItem, Type: OrderItem[]
  @Column()
  OrderItem: OrderItem[];
}
