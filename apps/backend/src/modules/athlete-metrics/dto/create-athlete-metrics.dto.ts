import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAthleteMetricsDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'الطول بالسنتيمتر', required: false })
    @IsOptional()
    @IsNumber()
    height?: number;

    @ApiProperty({ description: 'الوزن بالكيلوجرام', required: false })
    @IsOptional()
    @IsNumber()
    weight?: number;

    @ApiProperty({ description: 'السرعة (متر/ثانية)', required: false })
    @IsOptional()
    @IsNumber()
    speed?: number;

    @ApiProperty({ description: 'القوة (كيلوجرام)', required: false })
    @IsOptional()
    @IsNumber()
    strength?: number;

    @ApiProperty({ description: 'التحمل (دقيقة)', required: false })
    @IsOptional()
    @IsNumber()
    endurance?: number;

    @ApiProperty({ description: 'المرونة (درجة)', required: false })
    @IsOptional()
    @IsNumber()
    flexibility?: number;
} 