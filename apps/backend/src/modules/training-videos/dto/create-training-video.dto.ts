import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTrainingVideoDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    trainingId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;
} 