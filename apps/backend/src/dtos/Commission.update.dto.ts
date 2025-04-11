import { ApiProperty } from "@nestjs/swagger";
import { Agent, Transfer, PaymentStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Commission
export class UpdateCommissionDto {
  @ApiProperty({ type: "number" })
  // Field: agentId, Type: number
  @Column()
  agentId: number;

  @ApiProperty({ type: "number" })
  // Field: transferId, Type: number
  @Column()
  transferId: number;

  @ApiProperty({ type: "number" })
  // Field: amount, Type: number
  @Column()
  amount: number;

  @ApiProperty({ type: "number" })
  // Field: percentage, Type: number
  @Column()
  percentage: number;

  @ApiProperty({ type: "string" })
  // Field: currency, Type: string
  @Column()
  currency: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: paymentDate, Type: Date
  @Column()
  paymentDate: Date;

  @ApiProperty({ enum: PaymentStatus })
  // Field: status, Type: PaymentStatus
  @Column()
  status: PaymentStatus;
}
