import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateCoachDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ type: [String] })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    specialization: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    experience: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    methodology?: string;
} 