import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';

export class CreateLicenseDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    userId: number;

    @ApiProperty({ description: 'نوع الترخيص' })
    @IsString()
    type: string;

    @ApiProperty({ description: 'رقم الترخيص' })
    @IsString()
    number: string;

    @ApiProperty({ description: 'تاريخ إصدار الترخيص' })
    @IsDate()
    issueDate: Date;

    @ApiProperty({ description: 'تاريخ انتهاء الترخيص' })
    @IsDate()
    expiryDate: Date;

    @ApiProperty({ description: 'الجهة المصدرة', required: false })
    @IsString()
    @IsOptional()
    issuingAuthority?: string;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 