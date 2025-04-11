import { ApiProperty } from "@nestjs/swagger";
import { PlayerEntity } from "./Player.entity";
import { ClubEntity } from "./Club.entity";
import { AgentEntity } from "./Agent.entity";
import { CommissionEntity } from "./Commission.entity";
import { ContractEntity } from "./Contract.entity";
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
// This is the  Entity for Transfer
export class TransferEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: PlayerEntity })
  // Field: player, Type: Player
  @Column()
  player: Player;

  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: ClubEntity })
  // Field: fromClub, Type: Club
  @Column()
  fromClub: Club;

  @ApiProperty({ type: "number" })
  // Field: fromClubId, Type: number
  @Column()
  fromClubId: number;

  @ApiProperty({ type: ClubEntity })
  // Field: toClub, Type: Club
  @Column()
  toClub: Club;

  @ApiProperty({ type: "number" })
  // Field: toClubId, Type: number
  @Column()
  toClubId: number;

  @ApiProperty({ type: AgentEntity })
  // Field: agent, Type: Agent
  @Column()
  agent: Agent;

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

  @ApiProperty({ type: CommissionEntity, nullable: true })
  // Field: commission, Type: Commission
  @Column()
  commission?: Commission;

  @ApiProperty({ type: ContractEntity })
  // Field: contract, Type: Contract
  @Column()
  contract: Contract;

  @ApiProperty({ type: "number" })
  // Field: contractId, Type: number
  @Column()
  contractId: number;

  @ApiProperty({ enum: TransferStatus })
  // Field: status, Type: TransferStatus
  @Column()
  status: TransferStatus;
}
