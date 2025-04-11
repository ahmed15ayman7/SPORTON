import { ApiProperty } from "@nestjs/swagger";
import { User, ReportType, ReportStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for Report
export class CreateReportDto {
  @ApiProperty({ type: "number" })
  // Field: reporterId, Type: number
  @Column()
  reporterId: number;

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
