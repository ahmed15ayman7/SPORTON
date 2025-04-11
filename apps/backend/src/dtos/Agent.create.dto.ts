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
// This is the Create Entity for Agent
export class CreateAgentDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "string" })
  // Field: license, Type: string
  @Column()
  license?: string;

  @ApiProperty({ type: "string" })
  // Field: agency, Type: string
  @Column()
  agency?: string;
}
