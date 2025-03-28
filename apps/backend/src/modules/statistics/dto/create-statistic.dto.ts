import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStatisticDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    matchesPlayed: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    goals: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    assists: number;
} 