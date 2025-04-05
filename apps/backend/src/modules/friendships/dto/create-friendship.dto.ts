import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateFriendshipDto {
    @ApiProperty({ description: 'اسم المنشأة' })
    @IsString()
    status: string;
    @ApiProperty({ description: 'اسم المنشأة' })
    @IsString()
    createdAt: Date;
    @ApiProperty({ description: 'اسم المنشأة' })
    @IsString()
    userAId: number;
    @ApiProperty({ description: 'اسم المنشأة' })
    @IsString()
    userBId: number;
} 