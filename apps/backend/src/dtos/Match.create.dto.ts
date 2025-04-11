import { ApiProperty } from "@nestjs/swagger";
import { User, Tournament, ScoutingReport } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Match
export class CreateMatchDto {
  @ApiProperty({ type: "string" })
  // Field: teamA, Type: string
  @Column()
  teamA: string;

  @ApiProperty({ type: "string" })
  // Field: teamB, Type: string
  @Column()
  teamB: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;
}
