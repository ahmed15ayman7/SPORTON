import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { EventParticipantEntity } from "./EventParticipant.entity";
import { EventSponsorEntity } from "./EventSponsor.entity";
import { EventCategoryEntity } from "./EventCategory.entity";
import { EventImageEntity } from "./EventImage.entity";
import { EventAgendaEntity } from "./EventAgenda.entity";
import { PrizeEntity } from "./Prize.entity";
import { StreamingInfoEntity } from "./StreamingInfo.entity";
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
// This is the  Entity for Event
export class EventDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

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

  @ApiProperty({ type: UserEntity })
  // Field: organizer, Type: User
  @Column()
  organizer: User;

  @ApiProperty({ type: "number" })
  // Field: organizerId, Type: number
  @Column()
  organizerId: number;

  @ApiProperty({ type: EventParticipantEntity })
  // Field: participants, Type: EventParticipant[]
  @Column()
  participants: EventParticipant[];

  @ApiProperty({ type: EventSponsorEntity })
  // Field: sponsors, Type: EventSponsor[]
  @Column()
  sponsors: EventSponsor[];

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

  @ApiProperty({ type: EventCategoryEntity })
  // Field: categories, Type: EventCategory[]
  @Column()
  categories: EventCategory[];

  @ApiProperty({ type: EventImageEntity })
  // Field: gallery, Type: EventImage[]
  @Column()
  gallery: EventImage[];

  @ApiProperty({ type: EventAgendaEntity })
  // Field: agenda, Type: EventAgenda[]
  @Column()
  agenda: EventAgenda[];

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

  @ApiProperty({ type: PrizeEntity })
  // Field: prizes, Type: Prize[]
  @Column()
  prizes: Prize[];

  @ApiProperty({ type: StreamingInfoEntity, nullable: true })
  // Field: streaming, Type: StreamingInfo
  @Column()
  streaming?: StreamingInfo;
}
