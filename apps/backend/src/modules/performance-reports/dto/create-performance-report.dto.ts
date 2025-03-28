import { IsNumber, IsNotEmpty, IsDate, IsString, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePerformanceReportDto {
    @ApiProperty({ description: 'معرف الرياضي' })
    @IsNumber()
    @IsNotEmpty()
    athleteId: number;

    @ApiProperty({ description: 'تاريخ التقرير' })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: 'مقاييس الأداء' })
    @IsObject()
    @IsNotEmpty()
    metrics: Record<string, any>;

    @ApiProperty({ description: 'تحليل الأداء', required: false })
    @IsString()
    @IsOptional()
    analysis?: string;

    @ApiProperty({ description: 'التوصيات', required: false })
    @IsString()
    @IsOptional()
    recommendations?: string;

    @ApiProperty({ description: 'معرف المدرب' })
    @IsNumber()
    @IsNotEmpty()
    coachId: number;
} 