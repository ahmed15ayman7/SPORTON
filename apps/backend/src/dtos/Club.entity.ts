import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { PlayerEntity } from "./Player.entity";
import { CoachingHistoryEntity } from "./CoachingHistory.entity";
import { FacilityEntity } from "./Facility.entity";
import { TeamCategoryEntity } from "./TeamCategory.entity";
import { TournamentEntity } from "./Tournament.entity";
import { ContractEntity } from "./Contract.entity";
import { TransferEntity } from "./Transfer.entity";
import {
  User,
  Player,
  CoachingHistory,
  Facility,
  TeamCategory,
  Tournament,
  Contract,
  Transfer,
} from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Club
export class ClubEntity {
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

  @ApiProperty({ type: "number" })
  // Field: foundedYear, Type: number
  @Column()
  foundedYear: number;

  @ApiProperty({ type: "string", nullable: true })
  // Field: stadium, Type: string
  @Column()
  stadium?: string;

  @ApiProperty({ type: "string" })
  // Field: colors, Type: string[]
  @Column()
  colors: string[];

  @ApiProperty({ type: PlayerEntity })
  // Field: players, Type: Player[]
  @Column()
  players: Player[];

  @ApiProperty({ type: CoachingHistoryEntity })
  // Field: coaches, Type: CoachingHistory[]
  @Column()
  coaches: CoachingHistory[];

  @ApiProperty({ type: FacilityEntity })
  // Field: facilities, Type: Facility[]
  @Column()
  facilities: Facility[];

  @ApiProperty({ type: TeamCategoryEntity })
  // Field: teams, Type: TeamCategory[]
  @Column()
  teams: TeamCategory[];

  @ApiProperty({ type: TournamentEntity })
  // Field: tournaments, Type: Tournament[]
  @Column()
  tournaments: Tournament[];

  @ApiProperty({ type: ContractEntity })
  // Field: Contract, Type: Contract[]
  @Column()
  Contract: Contract[];

  @ApiProperty({ type: TransferEntity })
  // Field: Transfer, Type: Transfer[]
  @Column()
  Transfer: Transfer[];

  @ApiProperty({ type: TransferEntity })
  // Field: TransferTo, Type: Transfer[]
  @Column()
  TransferTo: Transfer[];
}
