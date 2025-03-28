import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class TransferDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    playerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    fromClubId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    toClubId: number;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    transferFee?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    contractTerms?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    agentId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status?: string;
} 