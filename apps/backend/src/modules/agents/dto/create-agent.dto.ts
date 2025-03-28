import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAgentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    license?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    agency?: string;
} 