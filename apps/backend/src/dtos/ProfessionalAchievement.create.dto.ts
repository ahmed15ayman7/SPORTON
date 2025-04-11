import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for ProfessionalAchievement
export class CreateProfessionalAchievementDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: organization, Type: string
  @Column()
  organization: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string" })
  // Field: proof, Type: string
  @Column()
  proof?: string;

  @ApiProperty({ type: "boolean" })
  // Field: verified, Type: boolean
  @Column()
  verified: boolean;
}
