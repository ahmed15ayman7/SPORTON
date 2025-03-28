import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateProfessionalAchievementDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'عنوان الإنجاز' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'المنظمة' })
    @IsString()
    organization: string;

    @ApiProperty({ description: 'تاريخ الإنجاز' })
    date: Date;

    @ApiProperty({ description: 'دليل الإنجاز (رابط)', required: false })
    @IsString()
    @IsOptional()
    proof?: string;

    @ApiProperty({ description: 'حالة التحقق', required: false })
    @IsBoolean()
    @IsOptional()
    verified?: boolean;
} 