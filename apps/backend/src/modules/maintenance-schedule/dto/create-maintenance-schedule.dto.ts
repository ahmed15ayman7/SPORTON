import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsDate, isDate } from 'class-validator';
import { FacilityType } from '@shared/prisma';

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

    @ApiProperty({ description: 'المنشأة', required: false })
    @IsString()
    type: string;

    @ApiProperty({ description: 'تاريخ البدء' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ الانتهاء' })
    @IsDate()
    endDate: Date;
} 