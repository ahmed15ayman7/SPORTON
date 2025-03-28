import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsEnum, IsFloat } from 'class-validator';
import { Type } from 'class-transformer';
import { Foot } from '@prisma/client';

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
    @IsFloat()
    height?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsFloat()
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
    @IsFloat()
    marketValue?: number;
} 