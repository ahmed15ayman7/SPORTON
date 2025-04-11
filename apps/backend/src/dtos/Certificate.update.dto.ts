import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Certificate
export class UpdateCertificateDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: issuer, Type: string
  @Column()
  issuer: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: issueDate, Type: Date
  @Column()
  issueDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: expiryDate, Type: Date
  @Column()
  expiryDate?: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "boolean" })
  // Field: verified, Type: boolean
  @Column()
  verified: boolean;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;
}
