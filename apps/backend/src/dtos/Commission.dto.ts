import { ApiProperty } from "@nestjs/swagger";
import { AgentEntity } from "./Agent.entity";
import { TransferEntity } from "./Transfer.entity";
import { Agent, Transfer, PaymentStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Commission
export class CommissionDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: AgentEntity })
  // Field: agent, Type: Agent
  @Column()
  agent: Agent;

  @ApiProperty({ type: "number" })
  // Field: agentId, Type: number
  @Column()
  agentId: number;

  @ApiProperty({ type: TransferEntity })
  // Field: transfer, Type: Transfer
  @Column()
  transfer: Transfer;

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
