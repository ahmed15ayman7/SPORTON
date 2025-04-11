import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "./Product.entity";
import { UserEntity } from "./User.entity";
import { Product, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for ProductReview
export class ProductReviewDto {
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

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number" })
  // Field: rating, Type: number
  @Column()
  rating: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: comment, Type: string
  @Column()
  comment?: string;

  @ApiProperty({ type: "string" })
  // Field: images, Type: string[]
  @Column()
  images: string[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "boolean" })
  // Field: verified, Type: boolean
  @Column()
  verified: boolean;
}
