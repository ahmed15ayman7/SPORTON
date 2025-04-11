import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { ProductEntity } from "./Product.entity";
import { SponsorshipEntity } from "./Sponsorship.entity";
import { JobEntity } from "./Job.entity";
import { User, CompanyType, Product, Sponsorship, Job } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Company
export class CompanyDto {
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

  @ApiProperty({ enum: CompanyType })
  // Field: type, Type: CompanyType
  @Column()
  type: CompanyType;

  @ApiProperty({ type: "string", nullable: true })
  // Field: registrationNo, Type: string
  @Column()
  registrationNo?: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: website, Type: string
  @Column()
  website?: string;

  @ApiProperty({ type: ProductEntity })
  // Field: products, Type: Product[]
  @Column()
  products: Product[];

  @ApiProperty({ type: SponsorshipEntity })
  // Field: sponsorships, Type: Sponsorship[]
  @Column()
  sponsorships: Sponsorship[];

  @ApiProperty({ type: JobEntity })
  // Field: jobs, Type: Job[]
  @Column()
  jobs: Job[];
}
