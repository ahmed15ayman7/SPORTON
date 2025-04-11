import { ApiProperty } from "@nestjs/swagger";
import { Notification, ActionType } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for NotificationAction
export class CreateNotificationActionDto {
  @ApiProperty({ type: "number" })
  // Field: notificationId, Type: number
  @Column()
  notificationId: number;

  @ApiProperty({ enum: ActionType })
  // Field: actionType, Type: ActionType
  @Column()
  actionType: ActionType;

  @ApiProperty({ type: "string" })
  // Field: actionUrl, Type: string
  @Column()
  actionUrl?: string;

  @ApiProperty({ type: "string" })
  // Field: buttonText, Type: string
  @Column()
  buttonText?: string;

  @ApiProperty({ type: "boolean" })
  // Field: completed, Type: boolean
  @Column()
  completed: boolean;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: completedAt, Type: Date
  @Column()
  completedAt?: Date;
}
