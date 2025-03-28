import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSponsorshipDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    sponsorId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    athleteId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    details?: string;
} 