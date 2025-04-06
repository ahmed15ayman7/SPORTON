import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsDate, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Foot } from '@shared/prisma';

export class CreatePlayerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dateOfBirth: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    height?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty({ enum: Foot, required: false })
    @IsOptional()
    @IsEnum(Foot)
    foot?: Foot;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    jerseyNumber?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    currentTeamId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    marketValue?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    facilityId: number;
} 
