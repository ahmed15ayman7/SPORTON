import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParticipationStatus } from '@shared/prisma';

export class CreateEventParticipantDto {
    @ApiProperty({ description: 'معرف الفعالية' })
    @IsNumber()
    @IsNotEmpty()
    eventId: number;

    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'حالة المشاركة', enum: ParticipationStatus })
    @IsEnum(ParticipationStatus)
    @IsNotEmpty()
    status: ParticipationStatus;
} 