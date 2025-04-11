import { ApiProperty } from "@nestjs/swagger";
import { Sport, TeamMember, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Team
export class CreateTeamDto {
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

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string" })
  // Field: logo, Type: string
  @Column()
  logo?: string;

  @ApiProperty({ type: "string" })
  // Field: achievements, Type: string
  @Column()
  achievements?: string;
}
