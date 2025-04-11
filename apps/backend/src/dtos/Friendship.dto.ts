import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Friendship
export class FriendshipDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: userA, Type: User
  @Column()
  userA: User;

  @ApiProperty({ type: "number" })
  // Field: userAId, Type: number
  @Column()
  userAId: number;

  @ApiProperty({ type: UserEntity })
  // Field: userB, Type: User
  @Column()
  userB: User;

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
