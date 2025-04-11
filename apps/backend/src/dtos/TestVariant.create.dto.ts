import { ApiProperty } from "@nestjs/swagger";
import { ABTest } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for TestVariant
export class CreateTestVariantDto {
  @ApiProperty({ type: "number" })
  // Field: testId, Type: number
  @Column()
  testId: number;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: configuration, Type: object
  @Column()
  configuration: object;

  @ApiProperty({ additionalProperties: true, type: "object" })
  // Field: performance, Type: object
  @Column()
  performance: object;
}
