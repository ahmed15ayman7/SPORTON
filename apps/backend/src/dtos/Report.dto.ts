import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User, ReportType, ReportStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Report
export class ReportDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: reporter, Type: User
  @Column()
  reporter: User;

  @ApiProperty({ type: "number" })
  // Field: reporterId, Type: number
  @Column()
  reporterId: number;

  @ApiProperty({ type: UserEntity })
  // Field: reported, Type: User
  @Column()
  reported: User;

  @ApiProperty({ type: "number" })
  // Field: reportedId, Type: number
  @Column()
  reportedId: number;

  @ApiProperty({ enum: ReportType })
  // Field: type, Type: ReportType
  @Column()
  type: ReportType;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ enum: ReportStatus })
  // Field: status, Type: ReportStatus
  @Column()
  status: ReportStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;
}
