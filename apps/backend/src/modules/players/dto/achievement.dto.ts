import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class AchievementDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    competition?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    playerIds?: number[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image?: string;
} 