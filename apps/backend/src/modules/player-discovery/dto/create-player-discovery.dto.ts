import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsDate } from 'class-validator';
import { DiscoveryStatus } from '@shared/prisma';

export class CreatePlayerDiscoveryDto {
    @ApiProperty({ description: 'معرف الكشاف' })
    @IsNumber()
    scoutId: number;

    @ApiProperty({ description: 'معرف اللاعب' })
    @IsNumber()
    playerId: number;

    @ApiProperty({ description: 'تاريخ الاكتشاف' })
    @IsDate()
    discoveryDate: Date;

    @ApiProperty({ description: 'الموقع الجغرافي' })
    @IsString()
    location: string;

    @ApiProperty({ description: 'المنافسة أو الحدث' })
    @IsString()
    competition: string;

    @ApiProperty({ description: 'حالة الاكتشاف' })
    @IsEnum(DiscoveryStatus)
    status: DiscoveryStatus;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 