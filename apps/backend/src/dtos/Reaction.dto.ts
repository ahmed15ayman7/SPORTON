import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "./User.entity";
import { PostEntity } from "./Post.entity";
import { User, Post } from "@shared/prisma";

import { Entity, Column } from "typeorm";
@Entity()
// This is the  Entity for Reaction
export class ReactionDto {
  @ApiProperty({ type: "number" })
  // Field: id, Type: number
  @Column()
  id: number;

  @ApiProperty({ type: "string" })
  // Field: emoji, Type: string
  @Column()
  emoji: string;

  @ApiProperty({ type: UserEntity })
  // Field: user, Type: User
  @Column()
  user: User;

  @ApiProperty({ type: "number" })
  // Field: userId, Type: number
  @Column()
  userId: number;

  @ApiProperty({ type: PostEntity })
  // Field: post, Type: Post
  @Column()
  post: Post;

  @ApiProperty({ type: "number" })
  // Field: postId, Type: number
  @Column()
  postId: number;

  @ApiProperty({ type: PostEntity })
  // Field: Post, Type: Post[]
  @Column()
  Post: Post[];
}
