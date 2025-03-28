import { IsNumber, IsNotEmpty, IsFloat } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignAnalyticsDto {
    @ApiProperty({ description: 'معرف الحملة المرتبطة' })
    @IsNumber()
    @IsNotEmpty()
    campaignId: number;

    @ApiProperty({ description: 'إجمالي الوصول' })
    @IsNumber()
    @IsNotEmpty()
    totalReach: number;

    @ApiProperty({ description: 'نسبة التفاعل' })
    @IsFloat()
    @IsNotEmpty()
    engagement: number;

    @ApiProperty({ description: 'عدد التحويلات' })
    @IsNumber()
    @IsNotEmpty()
    conversions: number;

    @ApiProperty({ description: 'العائد على الاستثمار' })
    @IsFloat()
    @IsNotEmpty()
    roi: number;
} 