import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { User, PlanType, SubscriptionStatus } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Subscription
export class SubscriptionDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ enum: PlanType })
  // Field: plan, Type: PlanType
  @Column()
  plan: PlanType;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ enum: SubscriptionStatus })
  // Field: status, Type: SubscriptionStatus
  @Column()
  status: SubscriptionStatus;

  @ApiProperty({ type: "string" })
  // Field: features, Type: string[]
  @Column()
  features: string[];
}
