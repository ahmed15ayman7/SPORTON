import { IsNumber, IsNotEmpty, IsEnum, IsFloat, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

export class CreateEngagementMetricsDto {
    @ApiProperty({ description: 'معرف المحتوى' })
    @IsNumber()
    @IsNotEmpty()
    contentId: number;

    @ApiProperty({ description: 'نوع المحتوى', enum: ContentType })
    @IsEnum(ContentType)
    @IsNotEmpty()
    contentType: ContentType;

    @ApiProperty({ description: 'عدد المشاهدات', required: false })
    @IsNumber()
    @IsOptional()
    viewCount?: number;

    @ApiProperty({ description: 'متوسط الوقت المستغرق', required: false })
    @IsFloat()
    @IsOptional()
    avgTimeSpent?: number;

    @ApiProperty({ description: 'معدل التفاعل', required: false })
    @IsFloat()
    @IsOptional()
    engagementRate?: number;

    @ApiProperty({ description: 'معدل الارتداد', required: false })
    @IsFloat()
    @IsOptional()
    bounceRate?: number;

    @ApiProperty({ description: 'ساعات الذروة', required: false })
    @IsOptional()
    peakHours?: any;

    @ApiProperty({ description: 'البيانات الديموغرافية', required: false })
    @IsOptional()
    demographics?: any;
} 