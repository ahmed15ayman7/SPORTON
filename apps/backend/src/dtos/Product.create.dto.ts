import { ApiProperty } from "@nestjs/swagger";
import {
  ProductImage,
  ProductCategory,
  Sport,
  ProductStatus,
  Discount,
  ProductVariant,
  ProductReview,
  OrderItem,
  User,
  Company,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Product
export class CreateProductDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ type: "number" })
  // Field: price, Type: number
  @Column()
  price: number;

  @ApiProperty({ type: "number" })
  // Field: categoryId, Type: number
  @Column()
  categoryId: number;

  @ApiProperty({ type: "string" })
  // Field: brand, Type: string
  @Column()
  brand?: string;

  @ApiProperty({ enum: Sport })
  // Field: sport, Type: Sport
  @Column()
  sport: Sport;

  @ApiProperty({ type: "number" })
  // Field: inStock, Type: number
  @Column()
  inStock: number;

  @ApiProperty({ enum: ProductStatus })
  // Field: status, Type: ProductStatus
  @Column()
  status: ProductStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: specifications, Type: object
  @Column()
  specifications?: object;

  @ApiProperty({ type: "number" })
  // Field: weight, Type: number
  @Column()
  weight?: number;

  @ApiProperty({ type: "boolean" })
  // Field: featured, Type: boolean
  @Column()
  featured: boolean;
}
