import { ApiProperty } from "@nestjs/swagger";
import { User } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for SocialMedia
export class CreateSocialMediaDto {
  @ApiProperty({ type: "string" })
  // Field: platform, Type: string
  @Column()
  platform: string;

  @ApiProperty({ type: "string" })
  // Field: url, Type: string
  @Column()
  url: string;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;
}
