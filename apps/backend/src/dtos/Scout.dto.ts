import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { ScoutingReportEntity } from "./ScoutingReport.entity";
import { PlayerDiscoveryEntity } from "./PlayerDiscovery.entity";
import { User, ScoutingReport, PlayerDiscovery } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Scout
export class ScoutDto {
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

  @ApiProperty({ type: "string" })
  // Field: specialization, Type: string[]
  @Column()
  specialization: string[];

  @ApiProperty({ type: "string" })
  // Field: regions, Type: string[]
  @Column()
  regions: string[];

  @ApiProperty({ type: ScoutingReportEntity })
  // Field: reports, Type: ScoutingReport[]
  @Column()
  reports: ScoutingReport[];

  @ApiProperty({ type: PlayerDiscoveryEntity })
  // Field: discoveries, Type: PlayerDiscovery[]
  @Column()
  discoveries: PlayerDiscovery[];
}
