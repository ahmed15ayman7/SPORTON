import { ApiProperty } from "@nestjs/swagger";
import { RoomUserEntity } from "./RoomUser.entity";
import { MessageEntity } from "./Message.entity";
import { RoomUser, Message } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Room
export class RoomEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: name, Type: string
  @Column()
  name?: string;

  @ApiProperty({ type: RoomUserEntity })
  // Field: users, Type: RoomUser[]
  @Column()
  users: RoomUser[];

  @ApiProperty({ type: MessageEntity })
  // Field: messages, Type: Message[]
  @Column()
  messages: Message[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
