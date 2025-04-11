import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { FacilityEntity } from "./Facility.entity";
import { ClubEntity } from "./Club.entity";
import { PlayerStatisticsEntity } from "./PlayerStatistics.entity";
import { ContractEntity } from "./Contract.entity";
import { AchievementEntity } from "./Achievement.entity";
import { InjuryEntity } from "./Injury.entity";
import { TeamCategoryEntity } from "./TeamCategory.entity";
import { AgentClientEntity } from "./AgentClient.entity";
import { TransferEntity } from "./Transfer.entity";
import { ScoutingReportEntity } from "./ScoutingReport.entity";
import { PlayerDiscoveryEntity } from "./PlayerDiscovery.entity";
import {
  User,
  Foot,
  Facility,
  Club,
  PlayerStatistics,
  Contract,
  Achievement,
  Injury,
  TeamCategory,
  AgentClient,
  Transfer,
  ScoutingReport,
  PlayerDiscovery,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Player
export class PlayerEntity {
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

  @ApiProperty({ type: "string", format: "date-time" })
  // Field: dateOfBirth, Type: Date
  @Column()
  dateOfBirth: Date;

  @ApiProperty({ type: "number", nullable: true })
  // Field: height, Type: number
  @Column()
  height?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: weight, Type: number
  @Column()
  weight?: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: position, Type: string
  @Column()
  position?: string;

  @ApiProperty({ enum: Foot, nullable: true })
  // Field: foot, Type: Foot
  @Column()
  foot?: Foot;

  @ApiProperty({ type: "number", nullable: true })
  // Field: jerseyNumber, Type: number
  @Column()
  jerseyNumber?: number;

  @ApiProperty({ type: "number" })
  // Field: facilityId, Type: number
  @Column()
  facilityId: number;

  @ApiProperty({ type: FacilityEntity })
  // Field: facility, Type: Facility
  @Column()
  facility: Facility;

  @ApiProperty({ type: "number", nullable: true })
  // Field: marketValue, Type: number
  @Column()
  marketValue?: number;

  @ApiProperty({ type: "number", nullable: true })
  // Field: currentTeamId, Type: number
  @Column()
  currentTeamId?: number;

  @ApiProperty({ type: ClubEntity, nullable: true })
  // Field: currentTeam, Type: Club
  @Column()
  currentTeam?: Club;

  @ApiProperty({ type: PlayerStatisticsEntity, nullable: true })
  // Field: statistics, Type: PlayerStatistics
  @Column()
  statistics?: PlayerStatistics;

  @ApiProperty({ type: ContractEntity })
  // Field: contracts, Type: Contract[]
  @Column()
  contracts: Contract[];

  @ApiProperty({ type: AchievementEntity })
  // Field: achievements, Type: Achievement[]
  @Column()
  achievements: Achievement[];

  @ApiProperty({ type: InjuryEntity })
  // Field: injuries, Type: Injury[]
  @Column()
  injuries: Injury[];

  @ApiProperty({ type: TeamCategoryEntity })
  // Field: TeamCategory, Type: TeamCategory[]
  @Column()
  TeamCategory: TeamCategory[];

  @ApiProperty({ type: AgentClientEntity })
  // Field: AgentClient, Type: AgentClient[]
  @Column()
  AgentClient: AgentClient[];

  @ApiProperty({ type: TransferEntity })
  // Field: Transfer, Type: Transfer[]
  @Column()
  Transfer: Transfer[];

  @ApiProperty({ type: ScoutingReportEntity })
  // Field: ScoutingReport, Type: ScoutingReport[]
  @Column()
  ScoutingReport: ScoutingReport[];

  @ApiProperty({ type: PlayerDiscoveryEntity })
  // Field: PlayerDiscovery, Type: PlayerDiscovery[]
  @Column()
  PlayerDiscovery: PlayerDiscovery[];
}
