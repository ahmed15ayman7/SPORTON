import { ApiProperty } from "@nestjs/swagger";
import { User, JobApplication, Company } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Job
export class UpdateJobDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "number" })
  // Field: companyId, Type: number
  @Column()
  companyId: number;
}
