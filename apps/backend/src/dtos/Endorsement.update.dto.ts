import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Endorsement
export class UpdateEndorsementDto {
  @ApiProperty({ type: "string" })
  // Field: skill, Type: string
  @Column()
  skill: string;

  @ApiProperty({ type: "number" })
  // Field: endorserId, Type: number
  @Column()
  endorserId: number;

  @ApiProperty({ type: "number" })
  // Field: recipientId, Type: number
  @Column()
  recipientId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
