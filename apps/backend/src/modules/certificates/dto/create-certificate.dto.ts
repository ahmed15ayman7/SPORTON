import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsDate, IsBoolean } from 'class-validator';
export class CreateCertificateDto {
    @ApiProperty({ description: 'المؤسسة المصدرة' })
    @IsString()
    issuer: string;
    @ApiProperty({ description: 'العنوان' })
    @IsString()
    title: string;
    @ApiProperty({ description: 'المستخدم' })
    @IsNumber()
    userId: number;
    @ApiProperty({ description: 'تاريخ الإصدار' })
    @IsDate()
    issueDate: Date;
    @ApiProperty({ description: 'تاريخ الانتهاء' })
    @IsDate()
    expiryDate: Date;
    @ApiProperty({ description: 'الوصف' })
    @IsString()
    description: string;
    @ApiProperty({ description: 'التحقق' })
    @IsBoolean()
    verified: boolean;
}