import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateFacilityDto {
    @ApiProperty({ description: 'اسم المنشأة' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'نوع المنشأة' })
    @IsString()
    type: string;

    @ApiProperty({ description: 'العنوان' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'السعة' })
    @IsNumber()
    capacity: number;

    @ApiProperty({ description: 'المرافق المتوفرة', type: [String] })
    @IsArray()
    @IsString({ each: true })
    amenities: string[];

    @ApiProperty({ description: 'ساعات العمل', required: false })
    @IsString()
    @IsOptional()
    operatingHours?: string;

    @ApiProperty({ description: 'معلومات الاتصال', required: false })
    @IsString()
    @IsOptional()
    contactInfo?: string;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 