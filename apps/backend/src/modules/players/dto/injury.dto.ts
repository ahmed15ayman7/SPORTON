import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class InjuryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    playerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    endDate?: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    severity?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    treatment?: string;
} 