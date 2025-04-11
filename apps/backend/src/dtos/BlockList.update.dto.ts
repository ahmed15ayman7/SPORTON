import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for BlockList
export class UpdateBlockListDto {
  @ApiProperty({ type: "number" })
  // Field: blockerId, Type: number
  @Column()
  blockerId: number;

  @ApiProperty({ type: "number" })
  // Field: blockedId, Type: number
  @Column()
  blockedId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
