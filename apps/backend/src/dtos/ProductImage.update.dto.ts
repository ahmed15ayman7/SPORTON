import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for ProductImage
export class UpdateProductImageDto {
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
