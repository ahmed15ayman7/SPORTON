import { ApiProperty } from "@nestjs/swagger";
import { TestVariantEntity } from "./TestVariant.entity";
import { TestStatus, TestVariant } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for ABTest
export class ABTestEntity {
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

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time", nullable: true })
  // Field: endDate, Type: Date
  @Column()
  endDate?: Date;

  @ApiProperty({ enum: TestStatus })
  // Field: status, Type: TestStatus
  @Column()
  status: TestStatus;

  @ApiProperty({ type: TestVariantEntity })
  // Field: variants, Type: TestVariant[]
  @Column()
  variants: TestVariant[];

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: metrics, Type: object
  @Column()
  metrics: object;

  @ApiProperty({ type: "string", nullable: true })
  // Field: winner, Type: string
  @Column()
  winner?: string;
}
