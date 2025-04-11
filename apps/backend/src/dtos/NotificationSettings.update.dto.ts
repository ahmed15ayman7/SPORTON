import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for NotificationSettings
export class UpdateNotificationSettingsDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "boolean" })
  // Field: emailEnabled, Type: boolean
  @Column()
  emailEnabled: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: pushEnabled, Type: boolean
  @Column()
  pushEnabled: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: smsEnabled, Type: boolean
  @Column()
  smsEnabled: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: messageNotifications, Type: boolean
  @Column()
  messageNotifications: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: transferNotifications, Type: boolean
  @Column()
  transferNotifications: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: matchNotifications, Type: boolean
  @Column()
  matchNotifications: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: trainingNotifications, Type: boolean
  @Column()
  trainingNotifications: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: newsNotifications, Type: boolean
  @Column()
  newsNotifications: boolean;

  @ApiProperty({ type: "boolean" })
  // Field: contractNotifications, Type: boolean
  @Column()
  contractNotifications: boolean;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: quietHoursStart, Type: Date
  @Column()
  quietHoursStart?: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: quietHoursEnd, Type: Date
  @Column()
  quietHoursEnd?: Date;

  @ApiProperty({ type: "string" })
  // Field: timezone, Type: string
  @Column()
  timezone: string;
}
