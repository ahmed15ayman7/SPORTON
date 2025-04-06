import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParticipationStatus } from '@shared/prisma';

export class CreateCompetitionParticipantDto {
    @ApiProperty({ description: 'معرف المسابقة' })
    @IsNumber()
    @IsNotEmpty()
    competitionId: number;

    @ApiProperty({ description: 'معرف المشارك' })
    @IsNumber()
    @IsNotEmpty()
    participantId: number;

    @ApiProperty({ description: 'حالة المشاركة', enum: ParticipationStatus })
    @IsEnum(ParticipationStatus)
    @IsNotEmpty()
    status: ParticipationStatus;

    @ApiProperty({ description: 'الترتيب النهائي', required: false })
    @IsNumber()
    @IsOptional()
    rank?: number;

    @ApiProperty({ description: 'النتيجة', required: false })
    @IsNumber()
    @IsOptional()
    score?: number;
} 