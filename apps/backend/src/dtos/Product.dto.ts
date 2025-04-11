import { ApiProperty } from "@nestjs/swagger";
import { ProductImageEntity } from "./ProductImage.entity";
import { ProductCategoryEntity } from "./ProductCategory.entity";
import { DiscountEntity } from "./Discount.entity";
import { ProductVariantEntity } from "./ProductVariant.entity";
import { ProductReviewEntity } from "./ProductReview.entity";
import { OrderItemEntity } from "./OrderItem.entity";
import { UserEntity } from "./User.entity";
import { CompanyEntity } from "./Company.entity";
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
// This is the  Entity for Product
export class ProductDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

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

  @ApiProperty({ type: ProductImageEntity })
  // Field: images, Type: ProductImage[]
  @Column()
  images: ProductImage[];

  @ApiProperty({ type: ProductCategoryEntity })
  // Field: category, Type: ProductCategory
  @Column()
  category: ProductCategory;

  @ApiProperty({ type: "number" })
  // Field: categoryId, Type: number
  @Column()
  categoryId: number;

  @ApiProperty({ type: "string", nullable: true })
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

  @ApiProperty({ type: DiscountEntity, nullable: true })
  // Field: discount, Type: Discount
  @Column()
  discount?: Discount;

  @ApiProperty({ type: ProductVariantEntity })
  // Field: variants, Type: ProductVariant[]
  @Column()
  variants: ProductVariant[];

  @ApiProperty({ type: ProductReviewEntity })
  // Field: reviews, Type: ProductReview[]
  @Column()
  reviews: ProductReview[];

  @ApiProperty({ type: OrderItemEntity })
  // Field: orders, Type: OrderItem[]
  @Column()
  orders: OrderItem[];

  @ApiProperty({ type: UserEntity })
  // Field: users, Type: User[]
  @Column()
  users: User[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: specifications, Type: object
  @Column()
  specifications?: object;

  @ApiProperty({ type: "number", nullable: true })
  // Field: weight, Type: number
  @Column()
  weight?: number;

  @ApiProperty({ type: "boolean" })
  // Field: featured, Type: boolean
  @Column()
  featured: boolean;

  @ApiProperty({ type: CompanyEntity })
  // Field: Company, Type: Company[]
  @Column()
  Company: Company[];
}
