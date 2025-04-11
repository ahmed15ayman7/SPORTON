import { ApiProperty } from "@nestjs/swagger";
import { Player, Club, ContractStatus, Agent, Transfer } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Contract
export class CreateContractDto {
  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: "number" })
  // Field: clubId, Type: number
  @Column()
  clubId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ type: "number" })
  // Field: salary, Type: number
  @Column()
  salary: number;

  @ApiProperty({ type: "string" })
  // Field: currency, Type: string
  @Column()
  currency: string;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: bonuses, Type: object
  @Column()
  bonuses?: object;

  @ApiProperty({ type: "number" })
  // Field: buyoutClause, Type: number
  @Column()
  buyoutClause?: number;

  @ApiProperty({ enum: ContractStatus })
  // Field: status, Type: ContractStatus
  @Column()
  status: ContractStatus;

  @ApiProperty({ type: "string" })
  // Field: documents, Type: string[]
  @Column()
  documents: string[];

  @ApiProperty({ type: "number" })
  // Field: agentId, Type: number
  @Column()
  agentId?: number;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: terms, Type: object
  @Column()
  terms?: object;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;
}
