import { ApiProperty } from "@nestjs/swagger";
import {
  Sport,
  User,
  EventParticipant,
  EventSponsor,
  EventStatus,
  EventCategory,
  EventImage,
  EventAgenda,
  Prize,
  StreamingInfo,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the Update Entity for Event
export class UpdateEventDto {
  @ApiProperty({ type: "string" })
  // Field: title, Type: string
  @Column()
  title: string;

  @ApiProperty({ type: "string" })
  // Field: description, Type: string
  @Column()
  description: string;

  @ApiProperty({ enum: Sport })
  // Field: sport, Type: Sport
  @Column()
  sport: Sport;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: startDate, Type: Date
  @Column()
  startDate: Date;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: endDate, Type: Date
  @Column()
  endDate: Date;

  @ApiProperty({ type: "string" })
  // Field: location, Type: string
  @Column()
  location: string;

  @ApiProperty({ type: "number" })
  // Field: organizerId, Type: number
  @Column()
  organizerId: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: maxParticipants, Type: number
  @Column()
  maxParticipants?: number;

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: registrationDeadline, Type: Date
  @Column()
  registrationDeadline: Date;

  @ApiProperty({ type: "number", nullable: true })
  // Field: price, Type: number
  @Column()
  price?: number;

  @ApiProperty({ enum: EventStatus })
  // Field: status, Type: EventStatus
  @Column()
  status: EventStatus;

  @ApiProperty({ type: "string", nullable: true })
  // Field: requirements, Type: string
  @Column()
  requirements?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: facilities, Type: string
  @Column()
  facilities?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: rules, Type: string
  @Column()
  rules?: string;
}
