import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerStatsDto {
    @ApiProperty()
    @IsNumber()
    playerId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    goals?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    assists?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    yellowCards?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    redCards?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    minutesPlayed?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    season?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    matchesPlayed?: number;
} 