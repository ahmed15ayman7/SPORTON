import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for AthleteMetrics
export class CreateAthleteMetricsDto {
  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: "number" })
  // Field: height, Type: number
  @Column()
  height?: number;

  @ApiProperty({ type: "number" })
  // Field: weight, Type: number
  @Column()
  weight?: number;

  @ApiProperty({ type: "number" })
  // Field: speed, Type: number
  @Column()
  speed?: number;

  @ApiProperty({ type: "number" })
  // Field: strength, Type: number
  @Column()
  strength?: number;

  @ApiProperty({ type: "number" })
  // Field: endurance, Type: number
  @Column()
  endurance?: number;

  @ApiProperty({ type: "number" })
  // Field: flexibility, Type: number
  @Column()
  flexibility?: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: lastUpdated, Type: Date
  @Column()
  lastUpdated: Date;
}
