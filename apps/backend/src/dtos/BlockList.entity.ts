import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for BlockList
export class BlockListEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: blocker, Type: User
  @Column()
  blocker: User;

  @ApiProperty({ type: "number" })
  // Field: blockerId, Type: number
  @Column()
  blockerId: number;

  @ApiProperty({ type: UserEntity })
  // Field: blocked, Type: User
  @Column()
  blocked: User;

  @ApiProperty({ type: "number" })
  // Field: blockedId, Type: number
  @Column()
  blockedId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
