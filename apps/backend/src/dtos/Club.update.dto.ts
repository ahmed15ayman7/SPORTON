import { ApiProperty } from "@nestjs/swagger";
import {
  User,
  Player,
  CoachingHistory,
  Facility,
  TeamCategory,
  Tournament,
  Contract,
  Transfer,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Club
export class UpdateClubDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number" })
  // Field: foundedYear, Type: number
  @Column()
  foundedYear: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: stadium, Type: string
  @Column()
  stadium?: string;

  @ApiProperty({ type: "string" })
  // Field: colors, Type: string[]
  @Column()
  colors: string[];
}
