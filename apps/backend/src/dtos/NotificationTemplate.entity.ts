import { ApiProperty } from "@nestjs/swagger";
import { NotificationType } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for NotificationTemplate
export class NotificationTemplateEntity {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

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

  @ApiProperty({ type: "string" })
  // Field: variables, Type: string[]
  @Column()
  variables: string[];

  @ApiProperty({ type: "string" })
  // Field: language, Type: string
  @Column()
  language: string;

  @ApiProperty({ type: "boolean" })
  // Field: isActive, Type: boolean
  @Column()
  isActive: boolean;
}
