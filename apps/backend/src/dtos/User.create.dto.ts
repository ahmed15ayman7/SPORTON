import { ApiProperty } from "@nestjs/swagger";
import {
  Role,
  UserStatus,
  Post,
  Message,
  Notification,
  Player,
  Coach,
  Club,
  Agent,
  Scout,
  Company,
  Skill,
  Achievement,
  Job,
  JobApplication,
  Match,
  Friendship,
  Review,
  BlockList,
  Training,
  Sponsorship,
  Reaction,
  RoomUser,
  Statistic,
  Certificate,
  Experience,
  Education,
  Team,
  TeamMember,
  Endorsement,
  Availability,
  Comment,
  EventSponsor,
  PerformanceReport,
  Subscription,
  Payment,
  Report,
  CompetitionParticipant,
  UserBehavior,
  TrainingReview,
  UserSegment,
  ProductReview,
  Order,
  Address,
  AthleteMetrics,
  Article,
  Advertisement,
  Event,
  EventParticipant,
  ProfessionalAchievement,
  SocialMedia,
  NotificationSettings,
  Product,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Create Entity for User
export class CreateUserDto {
  @ApiProperty({ type: "string" })
  // Field: email, Type: string
  @Column()
  email: string;

  @ApiProperty({ type: "string" })
  // Field: phone, Type: string
  @Column()
  phone: string;

  @ApiProperty({ type: "string" })
  // Field: password, Type: string
  @Column()
  password: string;

  @ApiProperty({ enum: Role })
  // Field: role, Type: Role
  @Column()
  role: Role;

  @ApiProperty({ enum: UserStatus })
  // Field: status, Type: UserStatus
  @Column()
  status: UserStatus;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: createdAt, Type: Date
  @Column()
  createdAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: updatedAt, Type: Date
  @Column()
  updatedAt: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: lastLogin, Type: Date
  @Column()
  lastLogin?: Date;

  @ApiProperty({ type: "string" })
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: image, Type: string
  @Column()
  image?: string;

  @ApiProperty({ type: "string" })
  // Field: country, Type: string
  @Column()
  country?: string;

  @ApiProperty({ type: "string" })
  // Field: city, Type: string
  @Column()
  city?: string;

  @ApiProperty({ type: "string" })
  // Field: language, Type: string
  @Column()
  language?: string;
}
