import { ApiProperty } from "@nestjs/swagger";
import { User, ScoutingReport, PlayerDiscovery } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Scout
export class CreateScoutDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "string" })
  // Field: specialization, Type: string[]
  @Column()
  specialization: string[];

  @ApiProperty({ type: "string" })
  // Field: regions, Type: string[]
  @Column()
  regions: string[];
}
