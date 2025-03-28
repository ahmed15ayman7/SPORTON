import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsDate } from 'class-validator';
import { FacilityType } from '@prisma/client';

export class CreateMaintenanceScheduleDto {
    @ApiProperty({ description: 'معرف المنشأة' })
    @IsNumber()
    facilityId: number;

    @ApiProperty({ description: 'نوع المنشأة' })
    @IsEnum(FacilityType)
    facilityType: FacilityType;

    @ApiProperty({ description: 'تاريخ الصيانة المخطط' })
    @IsDate()
    scheduledDate: Date;

    @ApiProperty({ description: 'نوع الصيانة' })
    @IsString()
    maintenanceType: string;

    @ApiProperty({ description: 'وصف الصيانة' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'المسؤول عن الصيانة' })
    @IsString()
    assignedTo: string;

    @ApiProperty({ description: 'حالة الصيانة' })
    @IsString()
    status: string;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 