import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsEnum, IsArray } from 'class-validator';
import { TrainingLevel } from '@shared/prisma';

export class CreateTrainingDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    coachId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    capacity: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(TrainingLevel)
    level: TrainingLevel;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    requirements?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    equipment?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    categoryIds?: number[];
} 