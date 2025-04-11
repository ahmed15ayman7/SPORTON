import { ApiProperty } from "@nestjs/swagger";
import { Coach } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for License
export class CreateLicenseDto {
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

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: expiryDate, Type: Date
  @Column()
  expiryDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: level, Type: string
  @Column()
  level: string;

  @ApiProperty({ type: "string" })
  // Field: certificate, Type: string
  @Column()
  certificate?: string;

  @ApiProperty({ type: "boolean" })
  // Field: verified, Type: boolean
  @Column()
  verified: boolean;
}
