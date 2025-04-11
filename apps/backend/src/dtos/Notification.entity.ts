import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { NotificationActionEntity } from "./NotificationAction.entity";
import { NotificationLogEntity } from "./NotificationLog.entity";
import { NotificationGroupEntity } from "./NotificationGroup.entity";
import {
  User,
  NotificationType,
  Priority,
  NotificationAction,
  NotificationLog,
  NotificationGroup,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Notification
export class NotificationEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: NotificationType })
  // Field: type, Type: NotificationType
  @Column()
  type: NotificationType;

  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: content, Type: string
  @Column()
  content: string;

  @ApiProperty({ additionalProperties: true, type: "object", nullable: true })
  // Field: data, Type: object
  @Column()
  data?: object;

  @ApiProperty({ type: "boolean" })
  // Field: isRead, Type: boolean
  @Column()
  isRead: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: isArchived, Type: boolean
  @Column()
  isArchived: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: readAt, Type: Date
  @Column()
  readAt?: Date;

  @ApiProperty({ enum: Priority })
  // Field: priority, Type: Priority
  @Column()
  priority: Priority;

  @ApiProperty({ type: NotificationActionEntity, nullable: true })
  // Field: action, Type: NotificationAction
  @Column()
  action?: NotificationAction;

  @ApiProperty({ type: UserEntity, nullable: true })
  // Field: sender, Type: User
  @Column()
  sender?: User;

  @ApiProperty({ type: "number", nullable: true })
  // Field: senderId, Type: number
  @Column()
  senderId?: number;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: expiresAt, Type: Date
  @Column()
  expiresAt?: Date;

  @ApiProperty({ type: NotificationLogEntity })
  // Field: NotificationLog, Type: NotificationLog[]
  @Column()
  NotificationLog: NotificationLog[];

  @ApiProperty({ type: NotificationGroupEntity })
  // Field: NotificationGroup, Type: NotificationGroup[]
  @Column()
  NotificationGroup: NotificationGroup[];
}
