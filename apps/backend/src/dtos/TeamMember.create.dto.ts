import { ApiProperty } from "@nestjs/swagger";
import { Team, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for TeamMember
export class CreateTeamMemberDto {
  @ApiProperty({ type: "number" })
  // Field: teamId, Type: number
  @Column()
  teamId: number;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "string" })
  // Field: role, Type: string
  @Column()
  role: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "boolean" })
  // Field: current, Type: boolean
  @Column()
  current: boolean;
}
