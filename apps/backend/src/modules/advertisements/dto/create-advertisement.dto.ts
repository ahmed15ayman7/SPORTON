import { IsString, IsNotEmpty, IsArray, IsOptional, IsEnum, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sport, Role, AdStatus, AgeRange } from '@prisma/client';

export class CreateAdvertisementDto {
    @ApiProperty({ description: 'عنوان الإعلان' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'وصف الإعلان' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'صورة الإعلان' })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({ description: 'رابط الإعلان' })
    @IsString()
    @IsOptional()
    url?: string;

    @ApiProperty({ description: 'معرف المعلن' })
    @IsNumber()
    @IsNotEmpty()
    sponsorId: number;

    @ApiProperty({ description: 'تاريخ بداية الإعلان' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الإعلان' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'الرياضات المستهدفة' })
    @IsArray()
    @IsEnum(Sport, { each: true })
    @IsNotEmpty()
    targetSports: Sport[];

    @ApiProperty({ description: 'الأدوار المستهدفة' })
    @IsArray()
    @IsEnum(Role, { each: true })
    @IsNotEmpty()
    targetRoles: Role[];

    @ApiProperty({ description: 'الميزانية' })
    @IsNumber()
    @IsNotEmpty()
    budget: number;

    @ApiProperty({ description: 'حالة الإعلان' })
    @IsEnum(AdStatus)
    @IsNotEmpty()
    status: AdStatus;

    @ApiProperty({ description: 'الموقع المستهدف' })
    @IsString()
    @IsOptional()
    targetLocation?: string;

    @ApiProperty({ description: 'الفئة العمرية المستهدفة' })
    @IsEnum(AgeRange)
    @IsOptional()
    targetAge?: AgeRange;

    @ApiProperty({ description: 'الكلمات المفتاحية' })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    keywords: string[];

    @ApiProperty({ description: 'الحد الأقصى للميزانية اليومية' })
    @IsNumber()
    @IsOptional()
    maxBudgetPerDay?: number;
} 