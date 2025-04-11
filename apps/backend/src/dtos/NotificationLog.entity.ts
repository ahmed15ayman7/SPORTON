import { ApiProperty } from "@nestjs/swagger";
import { NotificationEntity } from "./Notification.entity";
import {
  Notification,
  DeliveryStatus,
  NotificationChannel,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for NotificationLog
export class NotificationLogEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: NotificationEntity })
  // Field: notification, Type: Notification
  @Column()
  notification: Notification;

  @ApiProperty({ type: "number" })
  // Field: notificationId, Type: number
  @Column()
  notificationId: number;

  @ApiProperty({ enum: DeliveryStatus })
  // Field: status, Type: DeliveryStatus
  @Column()
  status: DeliveryStatus;

  @ApiProperty({ enum: NotificationChannel })
  // Field: channel, Type: NotificationChannel
  @Column()
  channel: NotificationChannel;

  @ApiProperty({ type: "number" })
  // Field: attempts, Type: number
  @Column()
  attempts: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: error, Type: string
  @Column()
  error?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: sentAt, Type: Date
  @Column()
  sentAt: Date;
}
