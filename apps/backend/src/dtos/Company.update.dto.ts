import { ApiProperty } from "@nestjs/swagger";
import { User, CompanyType, Product, Sponsorship, Job } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Company
export class UpdateCompanyDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: CompanyType })
  // Field: type, Type: CompanyType
  @Column()
  type: CompanyType;

  @ApiProperty({ type: "string", nullable: true })
  // Field: registrationNo, Type: string
  @Column()
  registrationNo?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: website, Type: string
  @Column()
  website?: string;
}
