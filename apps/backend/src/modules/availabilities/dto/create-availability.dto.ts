import { IsEnum, IsOptional, IsString, IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AvailabilityStatus } from '@shared/prisma';

export class CreateAvailabilityDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'حالة التوفر', enum: AvailabilityStatus })
    @IsEnum(AvailabilityStatus)
    @IsNotEmpty()
    status: AvailabilityStatus;

    @ApiProperty({ description: 'تاريخ البداية', required: false })
    @IsOptional()
    @IsDate()
    fromDate?: Date;

    @ApiProperty({ description: 'تاريخ النهاية', required: false })
    @IsOptional()
    @IsDate()
    toDate?: Date;

    @ApiProperty({ description: 'ملاحظات', required: false })
    @IsOptional()
    @IsString()
    notes?: string;
} 