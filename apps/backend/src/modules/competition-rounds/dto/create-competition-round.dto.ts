import { IsString, IsNotEmpty, IsNumber, IsEnum, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoundStatus } from '@prisma/client';

export class CreateCompetitionRoundDto {
    @ApiProperty({ description: 'معرف المسابقة' })
    @IsNumber()
    @IsNotEmpty()
    competitionId: number;

    @ApiProperty({ description: 'رقم الجولة' })
    @IsNumber()
    @IsNotEmpty()
    roundNumber: number;

    @ApiProperty({ description: 'تاريخ بداية الجولة' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الجولة' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'حالة الجولة', enum: RoundStatus })
    @IsEnum(RoundStatus)
    @IsNotEmpty()
    status: RoundStatus;
} 