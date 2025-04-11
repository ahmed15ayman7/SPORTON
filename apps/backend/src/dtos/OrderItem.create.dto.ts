import { ApiProperty } from "@nestjs/swagger";
import { Order, Product, ProductVariant } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for OrderItem
export class CreateOrderItemDto {
  @ApiProperty({ type: "number" })
  // Field: orderId, Type: number
  @Column()
  orderId: number;

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

  @ApiProperty({ type: "number" })
  // Field: variantId, Type: number
  @Column()
  variantId?: number;
}
