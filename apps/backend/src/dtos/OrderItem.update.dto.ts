import { ApiProperty } from "@nestjs/swagger";
import { Order, Product, ProductVariant } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for OrderItem
export class UpdateOrderItemDto {
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

  @ApiProperty({ type: "number", nullable: true })
  // Field: variantId, Type: number
  @Column()
  variantId?: number;
}
