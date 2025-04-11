import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { RoomEntity } from "./Room.entity";
import { User, Room } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Message
export class MessageEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: content, Type: string
  @Column()
  content?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: mediaUrl, Type: string
  @Column()
  mediaUrl?: string;

  @ApiProperty({ type: UserEntity })
  // Field: sender, Type: User
  @Column()
  sender: User;

  @ApiProperty({ type: "number" })
  // Field: senderId, Type: number
  @Column()
  senderId: number;

  @ApiProperty({ type: UserEntity })
  // Field: recipient, Type: User
  @Column()
  recipient: User;

  @ApiProperty({ type: "number" })
  // Field: recipientId, Type: number
  @Column()
  recipientId: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: timestamp, Type: Date
  @Column()
  timestamp: Date;

  @ApiProperty({ type: "boolean" })
  // Field: isRead, Type: boolean
  @Column()
  isRead: boolean;

  @ApiProperty({ type: RoomEntity })
  // Field: Room, Type: Room[]
  @Column()
  Room: Room[];

  @ApiProperty({ type: UserEntity })
  // Field: User, Type: User[]
  @Column()
  User: User[];
}
