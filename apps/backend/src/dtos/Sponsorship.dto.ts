import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { CompanyEntity } from "./Company.entity";
import { User, Company } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Sponsorship
export class SponsorshipDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: sponsor, Type: User
  @Column()
  sponsor: User;

  @ApiProperty({ type: "number" })
  // Field: sponsorId, Type: number
  @Column()
  sponsorId: number;

  @ApiProperty({ type: UserEntity })
  // Field: athlete, Type: User
  @Column()
  athlete: User;

  @ApiProperty({ type: "number" })
  // Field: athleteId, Type: number
  @Column()
  athleteId: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: details, Type: string
  @Column()
  details?: string;

  @ApiProperty({ type: CompanyEntity })
  // Field: Company, Type: Company[]
  @Column()
  Company: Company[];
}
