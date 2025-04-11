import { ApiProperty } from "@nestjs/swagger";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for OptimizationLog
export class OptimizationLogDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: date, Type: Date
  @Column()
  date: Date;

  @ApiProperty({ type: "string" })
  // Field: type, Type: string
  @Column()
  type: string;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: changes, Type: object
  @Column()
  changes: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: impact, Type: object
  @Column()
  impact: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: metrics, Type: object
  @Column()
  metrics: object;
}
