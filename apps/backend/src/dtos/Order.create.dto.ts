import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  OrderItem,
  OrderStatus,
  Address,
  PaymentStatus,
  PaymentMethod,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Order
export class CreateOrderDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: OrderStatus })
  // Field: status, Type: OrderStatus
  @Column()
  status: OrderStatus;

  @ApiProperty({ type: "number" })
  // Field: totalAmount, Type: number
  @Column()
  totalAmount: number;

  @ApiProperty({ type: "number" })
  // Field: addressId, Type: number
  @Column()
  addressId: number;

  @ApiProperty({ enum: PaymentStatus })
  // Field: paymentStatus, Type: PaymentStatus
  @Column()
  paymentStatus: PaymentStatus;

  @ApiProperty({ enum: PaymentMethod })
  // Field: paymentMethod, Type: PaymentMethod
  @Column()
  paymentMethod: PaymentMethod;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string" })
  // Field: trackingNumber, Type: string
  @Column()
  trackingNumber?: string;

  @ApiProperty({ type: "string" })
  // Field: notes, Type: string
  @Column()
  notes?: string;
}
