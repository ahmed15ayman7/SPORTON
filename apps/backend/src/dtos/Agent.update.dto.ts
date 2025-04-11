import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  AgentClient,
  Transfer,
  Commission,
  Contract,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Agent
export class UpdateAgentDto {
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
}
