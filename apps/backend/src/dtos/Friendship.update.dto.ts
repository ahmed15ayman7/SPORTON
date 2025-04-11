import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Friendship
export class UpdateFriendshipDto {
  @ApiProperty({ type: "number" })
  // Field: userAId, Type: number
  @Column()
  userAId: number;

  @ApiProperty({ type: "number" })
  // Field: userBId, Type: number
  @Column()
  userBId: number;

  @ApiProperty({ type: "string" })
  // Field: status, Type: string
  @Column()
  status: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
