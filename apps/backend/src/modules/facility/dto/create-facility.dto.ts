import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';
import { FacilityType, FacilityStatus } from '@prisma/client';

export class CreateFacilityDto {
    @ApiProperty({ description: 'اسم المنشأة' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'معرف النادي' })
    @IsNumber()
    clubId: number;

    @ApiProperty({ description: 'نوع المنشأة' })
    @IsString()
    @IsEnum(FacilityType)
    type: FacilityType;

    @ApiProperty({ description: 'العنوان' })
    @IsString()
    location: string;

    @ApiProperty({ description: 'السعة' })
    @IsNumber()
    capacity: number;

    @ApiProperty({ description: 'المرافق المتوفرة', type: [String] })
    @IsArray()
    @IsString({ each: true })
    images: string[];

    @ApiProperty({ description: 'الوصف', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'الحالة', required: false })
    @IsEnum(FacilityStatus)
    @IsOptional()
    status?: FacilityStatus;

    @ApiProperty({ description: 'الرمز', required: false })
    @IsString()
    @IsOptional()
    icon: string;

} 