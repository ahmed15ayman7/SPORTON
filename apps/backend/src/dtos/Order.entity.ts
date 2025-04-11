import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { OrderItemEntity } from "./OrderItem.entity";
import { AddressEntity } from "./Address.entity";
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
// This is the  Entity for Order
export class OrderEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: OrderItemEntity })
  // Field: items, Type: OrderItem[]
  @Column()
  items: OrderItem[];

  @ApiProperty({ enum: OrderStatus })
  // Field: status, Type: OrderStatus
  @Column()
  status: OrderStatus;

  @ApiProperty({ type: "number" })
  // Field: totalAmount, Type: number
  @Column()
  totalAmount: number;

  @ApiProperty({ type: AddressEntity })
  // Field: address, Type: Address
  @Column()
  address: Address;

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

  @ApiProperty({ type: "string", nullable: true })
  // Field: trackingNumber, Type: string
  @Column()
  trackingNumber?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: notes, Type: string
  @Column()
  notes?: string;
}
