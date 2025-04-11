import { ApiProperty } from "@nestjs/swagger";
import { User, Company } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Sponsorship
export class CreateSponsorshipDto {
  @ApiProperty({ type: "number" })
  // Field: sponsorId, Type: number
  @Column()
  sponsorId: number;

  @ApiProperty({ type: "number" })
  // Field: athleteId, Type: number
  @Column()
  athleteId: number;

  @ApiProperty({ type: "string" })
  // Field: details, Type: string
  @Column()
  details?: string;
}
