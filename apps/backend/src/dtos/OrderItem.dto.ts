import { ApiProperty } from "@nestjs/swagger";
import { OrderEntity } from "./Order.entity";
import { ProductEntity } from "./Product.entity";
import { ProductVariantEntity } from "./ProductVariant.entity";
import { Order, Product, ProductVariant } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for OrderItem
export class OrderItemDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: OrderEntity })
  // Field: order, Type: Order
  @Column()
  order: Order;

  @ApiProperty({ type: "number" })
  // Field: orderId, Type: number
  @Column()
  orderId: number;

  @ApiProperty({ type: ProductEntity })
  // Field: product, Type: Product
  @Column()
  product: Product;

  @ApiProperty({ type: "number" })
  // Field: productId, Type: number
  @Column()
  productId: number;

  @ApiProperty({ type: "number" })
  // Field: quantity, Type: number
  @Column()
  quantity: number;

  @ApiProperty({ type: "number" })
  // Field: price, Type: number
  @Column()
  price: number;

  @ApiProperty({ type: ProductVariantEntity, nullable: true })
  // Field: variant, Type: ProductVariant
  @Column()
  variant?: ProductVariant;

  @ApiProperty({ type: "number", nullable: true })
  // Field: variantId, Type: number
  @Column()
  variantId?: number;
}
