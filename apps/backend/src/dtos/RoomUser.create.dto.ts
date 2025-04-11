import { ApiProperty } from "@nestjs/swagger";
import { Room, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for RoomUser
export class CreateRoomUserDto {
  @ApiProperty({ type: "number" })
  // Field: roomId, Type: number
  @Column()
  roomId: number;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;
}
