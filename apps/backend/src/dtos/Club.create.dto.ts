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
// This is the Create Entity for Club
export class CreateClubDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number" })
  // Field: foundedYear, Type: number
  @Column()
  foundedYear: number;

  @ApiProperty({ type: "string" })
  // Field: stadium, Type: string
  @Column()
  stadium?: string;

  @ApiProperty({ type: "string" })
  // Field: colors, Type: string[]
  @Column()
  colors: string[];
}
