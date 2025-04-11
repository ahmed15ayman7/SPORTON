import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for AthleteMetrics
export class UpdateAthleteMetricsDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: height, Type: number
  @Column()
  height?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: weight, Type: number
  @Column()
  weight?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: speed, Type: number
  @Column()
  speed?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: strength, Type: number
  @Column()
  strength?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: endurance, Type: number
  @Column()
  endurance?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: flexibility, Type: number
  @Column()
  flexibility?: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: lastUpdated, Type: Date
  @Column()
  lastUpdated: Date;
}
