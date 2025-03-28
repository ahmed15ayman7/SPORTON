import { IsNumber, IsNotEmpty, IsOptional, IsFloat } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAthleteMetricsDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'الطول بالسنتيمتر', required: false })
    @IsOptional()
    @IsFloat()
    height?: number;

    @ApiProperty({ description: 'الوزن بالكيلوجرام', required: false })
    @IsOptional()
    @IsFloat()
    weight?: number;

    @ApiProperty({ description: 'السرعة (متر/ثانية)', required: false })
    @IsOptional()
    @IsFloat()
    speed?: number;

    @ApiProperty({ description: 'القوة (كيلوجرام)', required: false })
    @IsOptional()
    @IsFloat()
    strength?: number;

    @ApiProperty({ description: 'التحمل (دقيقة)', required: false })
    @IsOptional()
    @IsFloat()
    endurance?: number;

    @ApiProperty({ description: 'المرونة (درجة)', required: false })
    @IsOptional()
    @IsFloat()
    flexibility?: number;
} 