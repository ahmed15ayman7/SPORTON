import { ApiProperty } from "@nestjs/swagger";
import { TeamEntity } from "./Team.entity";
import { UserEntity } from "./User.entity";
import { Team, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for TeamMember
export class TeamMemberEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: TeamEntity })
  // Field: team, Type: Team
  @Column()
  team: Team;

  @ApiProperty({ type: "number" })
  // Field: teamId, Type: number
  @Column()
  teamId: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

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

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "boolean" })
  // Field: current, Type: boolean
  @Column()
  current: boolean;
}
