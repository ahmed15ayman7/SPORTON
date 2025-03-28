import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ContractDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    playerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    clubId: number;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    salary?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    agentId?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    terms?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    releaseClause?: string;
} 