import { ApiProperty } from "@nestjs/swagger";
import { RoomEntity } from "./Room.entity";
import { UserEntity } from "./User.entity";
import { Room, User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for RoomUser
export class RoomUserEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: RoomEntity })
  // Field: room, Type: Room
  @Column()
  room: Room;

  @ApiProperty({ type: "number" })
  // Field: roomId, Type: number
  @Column()
  roomId: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;
}
