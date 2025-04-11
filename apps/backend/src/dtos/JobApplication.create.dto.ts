import { ApiProperty } from "@nestjs/swagger";
import { Job, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for JobApplication
export class CreateJobApplicationDto {
  @ApiProperty({ type: "number" })
  // Field: jobId, Type: number
  @Column()
  jobId: number;

  @ApiProperty({ type: "number" })
  // Field: applicantId, Type: number
  @Column()
  applicantId: number;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;
}
