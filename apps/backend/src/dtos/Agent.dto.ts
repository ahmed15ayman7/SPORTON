import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { AgentClientEntity } from "./AgentClient.entity";
import { TransferEntity } from "./Transfer.entity";
import { CommissionEntity } from "./Commission.entity";
import { ContractEntity } from "./Contract.entity";
import {
  User,
  AgentClient,
  Transfer,
  Commission,
  Contract,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Agent
export class AgentDto {
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

  @ApiProperty({ type: "string", nullable: true })
  // Field: license, Type: string
  @Column()
  license?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: agency, Type: string
  @Column()
  agency?: string;

  @ApiProperty({ type: AgentClientEntity })
  // Field: clients, Type: AgentClient[]
  @Column()
  clients: AgentClient[];

  @ApiProperty({ type: TransferEntity })
  // Field: deals, Type: Transfer[]
  @Column()
  deals: Transfer[];

  @ApiProperty({ type: CommissionEntity })
  // Field: commissions, Type: Commission[]
  @Column()
  commissions: Commission[];

  @ApiProperty({ type: ContractEntity })
  // Field: Contract, Type: Contract[]
  @Column()
  Contract: Contract[];
}
