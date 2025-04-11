import { ApiProperty } from "@nestjs/swagger";
import { User, Room } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Message
export class UpdateMessageDto {
  @ApiProperty({ type: "string", nullable: true })
  // Field: content, Type: string
  @Column()
  content?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: mediaUrl, Type: string
  @Column()
  mediaUrl?: string;

  @ApiProperty({ type: "number" })
  // Field: senderId, Type: number
  @Column()
  senderId: number;

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
}
