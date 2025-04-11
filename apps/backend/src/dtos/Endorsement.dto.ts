import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Endorsement
export class EndorsementDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: skill, Type: string
  @Column()
  skill: string;

  @ApiProperty({ type: UserEntity })
  // Field: endorser, Type: User
  @Column()
  endorser: User;

  @ApiProperty({ type: "number" })
  // Field: endorserId, Type: number
  @Column()
  endorserId: number;

  @ApiProperty({ type: UserEntity })
  // Field: recipient, Type: User
  @Column()
  recipient: User;

  @ApiProperty({ type: "number" })
  // Field: recipientId, Type: number
  @Column()
  recipientId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
