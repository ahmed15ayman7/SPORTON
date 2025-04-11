import { ApiProperty } from "@nestjs/swagger";
import { CoachEntity } from "./Coach.entity";
import { Coach } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for License
export class LicenseDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: CoachEntity })
  // Field: coach, Type: Coach
  @Column()
  coach: Coach;

  @ApiProperty({ type: "number" })
  // Field: coachId, Type: number
  @Column()
  coachId: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: issuedBy, Type: string
  @Column()
  issuedBy: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: issueDate, Type: Date
  @Column()
  issueDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: expiryDate, Type: Date
  @Column()
  expiryDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: level, Type: string
  @Column()
  level: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: certificate, Type: string
  @Column()
  certificate?: string;

  @ApiProperty({ type: "boolean" })
  // Field: verified, Type: boolean
  @Column()
  verified: boolean;
}
