import { ApiProperty } from "@nestjs/swagger";
import { TestStatus, TestVariant } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for ABTest
export class CreateABTestDto {
  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description?: string;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ enum: TestStatus })
  // Field: status, Type: TestStatus
  @Column()
  status: TestStatus;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: metrics, Type: object
  @Column()
  metrics: object;

  @ApiProperty({ type: "string" })
  // Field: winner, Type: string
  @Column()
  winner?: string;
}
