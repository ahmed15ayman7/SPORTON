import { ApiProperty } from "@nestjs/swagger";
import { Notification, ActionType } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for NotificationAction
export class UpdateNotificationActionDto {
  @ApiProperty({ type: "number" })
  // Field: notificationId, Type: number
  @Column()
  notificationId: number;

  @ApiProperty({ enum: ActionType })
  // Field: actionType, Type: ActionType
  @Column()
  actionType: ActionType;

  @ApiProperty({ type: "string", nullable: true })
  // Field: actionUrl, Type: string
  @Column()
  actionUrl?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: buttonText, Type: string
  @Column()
  buttonText?: string;

  @ApiProperty({ type: "boolean" })
  // Field: completed, Type: boolean
  @Column()
  completed: boolean;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: completedAt, Type: Date
  @Column()
  completedAt?: Date;
}
