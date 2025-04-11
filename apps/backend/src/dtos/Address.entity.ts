import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { OrderEntity } from "./Order.entity";
import { User, Order } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Address
export class AddressEntity {
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
  // Field: name, Type: string
  @Column()
  name: string;

  @ApiProperty({ type: "string" })
  // Field: street, Type: string
  @Column()
  street: string;

  @ApiProperty({ type: "string" })
  // Field: city, Type: string
  @Column()
  city: string;

  @ApiProperty({ type: "string" })
  // Field: state, Type: string
  @Column()
  state: string;

  @ApiProperty({ type: "string" })
  // Field: country, Type: string
  @Column()
  country: string;

  @ApiProperty({ type: "string", nullable: true })
  // Field: zipCode, Type: string
  @Column()
  zipCode?: string;

  @ApiProperty({ type: "string" })
  // Field: phone, Type: string
  @Column()
  phone: string;

  @ApiProperty({ type: "boolean" })
  // Field: isDefault, Type: boolean
  @Column()
  isDefault: boolean;

  @ApiProperty({ type: OrderEntity })
  // Field: orders, Type: Order[]
  @Column()
  orders: Order[];
}
