import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ParticipationStatus } from '@shared/prisma';

export class CreateEventSponsorDto {
    @ApiProperty({ description: 'معرف الفعالية' })
    @IsNumber()
    eventId: number;

    @ApiProperty({ description: 'معرف الراعي' })
    @IsNumber()
    sponsorId: number;

    @ApiProperty({ description: 'نوع الدعم' })
    @IsString()
    sponsorshipType: string;

    @ApiProperty({ description: 'مبلغ الدعم' })
    @IsNumber()
    amount: number;

} 