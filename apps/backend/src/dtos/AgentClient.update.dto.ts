import { ApiProperty } from "@nestjs/swagger";
import { Agent, Player, ClientStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for AgentClient
export class UpdateAgentClientDto {
  @ApiProperty({ type: "number" })
  // Field: agentId, Type: number
  @Column()
  agentId: number;

  @ApiProperty({ type: "number" })
  // Field: playerId, Type: number
  @Column()
  playerId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: contract, Type: string
  @Column()
  contract?: string;

  @ApiProperty({ type: "number" })
  // Field: commission, Type: number
  @Column()
  commission: number;

  @ApiProperty({ enum: ClientStatus })
  // Field: status, Type: ClientStatus
  @Column()
  status: ClientStatus;
}
