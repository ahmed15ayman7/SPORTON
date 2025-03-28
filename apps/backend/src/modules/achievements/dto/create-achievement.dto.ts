import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAchievementDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    details?: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
} 