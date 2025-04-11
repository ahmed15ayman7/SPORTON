import { ApiProperty } from "@nestjs/swagger";
import { User, Company } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Sponsorship
export class UpdateSponsorshipDto {
  @ApiProperty({ type: "number" })
  // Field: sponsorId, Type: number
  @Column()
  sponsorId: number;

  @ApiProperty({ type: "number" })
  // Field: athleteId, Type: number
  @Column()
  athleteId: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: details, Type: string
  @Column()
  details?: string;
}
