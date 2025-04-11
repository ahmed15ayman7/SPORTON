import { ApiProperty } from "@nestjs/swagger";
import { Product, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for ProductReview
export class CreateProductReviewDto {
  @ApiProperty({ type: "number" })
  // Field: productId, Type: number
  @Column()
  productId: number;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number" })
  // Field: rating, Type: number
  @Column()
  rating: number;

  @ApiProperty({ type: "string" })
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
