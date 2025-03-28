import { IsNumber, IsNotEmpty, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdAnalyticsDto {
    @ApiProperty({ description: 'معرف الإعلان المرتبط' })
    @IsNumber()
    @IsNotEmpty()
    adId: number;

    @ApiProperty({ description: 'عدد التحويلات' })
    @IsNumber()
    @IsNotEmpty()
    conversions: number;

    @ApiProperty({ description: 'معدل النقر' })
    @IsNumber()
    @IsNotEmpty()
    ctr: number;

    @ApiProperty({ description: 'معدل التفاعل' })
    @IsFloat()
    @IsNotEmpty()
    engagement: number;

    @ApiProperty({ description: 'الوصول' })
    @IsNumber()
    @IsNotEmpty()
    reach: number;
} 