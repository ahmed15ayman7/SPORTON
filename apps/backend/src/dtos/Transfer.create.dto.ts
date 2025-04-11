import { ApiProperty } from "@nestjs/swagger";
import {
  Player,
  Club,
  Agent,
  TransferType,
  Commission,
  Contract,
  TransferStatus,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Transfer
export class CreateTransferDto {
  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: "number" })
  // Field: fromClubId, Type: number
  @Column()
  fromClubId: number;

  @ApiProperty({ type: "number" })
  // Field: toClubId, Type: number
  @Column()
  toClubId: number;

  @ApiProperty({ type: "number" })
  // Field: agentId, Type: number
  @Column()
  agentId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "number" })
  // Field: fee, Type: number
  @Column()
  fee: number;

  @ApiProperty({ type: "string" })
  // Field: currency, Type: string
  @Column()
  currency: string;

  @ApiProperty({ enum: TransferType })
  // Field: type, Type: TransferType
  @Column()
  type: TransferType;

  @ApiProperty({ type: "number" })
  // Field: contractId, Type: number
  @Column()
  contractId: number;

  @ApiProperty({ enum: TransferStatus })
  // Field: status, Type: TransferStatus
  @Column()
  status: TransferStatus;
}
