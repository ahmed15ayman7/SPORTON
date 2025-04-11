import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "./Product.entity";
import { Product } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Discount
export class DiscountEntity {
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

  @ApiProperty({ type: "number" })
  // Field: percentage, Type: number
  @Column()
  percentage: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ type: "boolean" })
  // Field: active, Type: boolean
  @Column()
  active: boolean;
}
