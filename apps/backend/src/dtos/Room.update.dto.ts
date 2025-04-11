import { ApiProperty } from "@nestjs/swagger";
import { RoomUser, Message } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Room
export class UpdateRoomDto {
  @ApiProperty({ type: "string", nullable: true })
  // Field: name, Type: string
  @Column()
  name?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
