import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class CreateLicenseDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    coachId: number;

    @ApiProperty({ description: 'اسم الترخيص' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'الجهة المصدرة' })
    @IsString()
    issuedBy: string;

    @ApiProperty({ description: 'تاريخ إصدار الترخيص' })
    @IsDate()
    issueDate: Date;

    @ApiProperty({ description: 'تاريخ انتهاء الترخيص' })
    @IsDate()
    expiryDate: Date;

    @ApiProperty({ description: 'مستوى الترخيص' })
    @IsString()
    level: string;

    @ApiProperty({ description: 'رابط الشهادة', required: false })
    @IsString()
    @IsOptional()
    certificate?: string;

    @ApiProperty({ description: 'حالة التحقق', required: false })
    @IsBoolean()
    @IsOptional()
    verified?: boolean;
} 