import { ApiProperty } from "@nestjs/swagger";
import { TeamMemberEntity } from "./TeamMember.entity";
import { UserEntity } from "./User.entity";
import { Sport, TeamMember, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Team
export class TeamEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ enum: Sport })
  // Field: sport, Type: Sport
  @Column()
  sport: Sport;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: logo, Type: string
  @Column()
  logo?: string;

  @ApiProperty({ type: TeamMemberEntity })
  // Field: members, Type: TeamMember[]
  @Column()
  members: TeamMember[];

  @ApiProperty({ type: "string", nullable: true })
  // Field: achievements, Type: string
  @Column()
  achievements?: string;

  @ApiProperty({ type: UserEntity })
  // Field: User, Type: User[]
  @Column()
  User: User[];
}
