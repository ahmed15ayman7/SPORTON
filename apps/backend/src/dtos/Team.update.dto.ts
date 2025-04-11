import { ApiProperty } from "@nestjs/swagger";
import { Sport, TeamMember, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Team
export class UpdateTeamDto {
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

  @ApiProperty({ type: "string", nullable: true })
  // Field: achievements, Type: string
  @Column()
  achievements?: string;
}
