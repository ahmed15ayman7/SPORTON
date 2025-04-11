import { ApiProperty } from "@nestjs/swagger";
import { JobEntity } from "./Job.entity";
import { UserEntity } from "./User.entity";
import { Job, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for JobApplication
export class JobApplicationEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: JobEntity })
  // Field: job, Type: Job
  @Column()
  job: Job;

  @ApiProperty({ type: "number" })
  // Field: jobId, Type: number
  @Column()
  jobId: number;

  @ApiProperty({ type: UserEntity })
  // Field: applicant, Type: User
  @Column()
  applicant: User;

  @ApiProperty({ type: "number" })
  // Field: applicantId, Type: number
  @Column()
  applicantId: number;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;
}
