import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User, PaymentType, PaymentStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Payment
export class PaymentEntity {
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

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ enum: PaymentType })
  // Field: type, Type: PaymentType
  @Column()
  type: PaymentType;

  @ApiProperty({ enum: PaymentStatus })
  // Field: status, Type: PaymentStatus
  @Column()
  status: PaymentStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;
}
