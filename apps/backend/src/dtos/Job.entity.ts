import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { JobApplicationEntity } from "./JobApplication.entity";
import { CompanyEntity } from "./Company.entity";
import { User, JobApplication, Company } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Job
export class JobEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: UserEntity })
  // Field: company, Type: User
  @Column()
  company: User;

  @ApiProperty({ type: "number" })
  // Field: companyId, Type: number
  @Column()
  companyId: number;

  @ApiProperty({ type: JobApplicationEntity })
  // Field: applications, Type: JobApplication[]
  @Column()
  applications: JobApplication[];

  @ApiProperty({ type: CompanyEntity })
  // Field: Company, Type: Company[]
  @Column()
  Company: Company[];
}
