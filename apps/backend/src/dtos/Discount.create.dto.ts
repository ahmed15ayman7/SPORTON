import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Discount
export class CreateDiscountDto {
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
