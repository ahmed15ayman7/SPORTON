import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Education
export class EducationDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: institution, Type: string
  @Column()
  institution: string;

  @ApiProperty({ type: "string" })
  // Field: degree, Type: string
  @Column()
  degree: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: field, Type: string
  @Column()
  field?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ type: "string", nullable: true })
  // Field: grade, Type: string
  @Column()
  grade?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: activities, Type: string
  @Column()
  activities?: string;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;
}
