import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Education
export class CreateEducationDto {
  @ApiProperty({ type: "string" })
  // Field: institution, Type: string
  @Column()
  institution: string;

  @ApiProperty({ type: "string" })
  // Field: degree, Type: string
  @Column()
  degree: string;

  @ApiProperty({ type: "string" })
  // Field: field, Type: string
  @Column()
  field?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "string" })
  // Field: grade, Type: string
  @Column()
  grade?: string;

  @ApiProperty({ type: "string" })
  // Field: activities, Type: string
  @Column()
  activities?: string;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;
}
