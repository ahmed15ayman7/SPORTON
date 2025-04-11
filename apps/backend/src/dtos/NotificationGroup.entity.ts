import { ApiProperty } from "@nestjs/swagger";
import { NotificationEntity } from "./Notification.entity";
import { Notification } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for NotificationGroup
export class NotificationGroupEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: NotificationEntity })
  // Field: notifications, Type: Notification[]
  @Column()
  notifications: Notification[];

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
