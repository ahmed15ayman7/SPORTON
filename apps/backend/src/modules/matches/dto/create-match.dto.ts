import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatchDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    teamA: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    teamB: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    players?: string[];
} 