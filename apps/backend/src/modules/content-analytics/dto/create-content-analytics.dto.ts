import { IsNumber, IsNotEmpty, IsEnum, IsFloat, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

export class CreateContentAnalyticsDto {
    @ApiProperty({ description: 'نوع المحتوى', enum: ContentType })
    @IsEnum(ContentType)
    @IsNotEmpty()
    contentType: ContentType;

    @ApiProperty({ description: 'معرف المحتوى' })
    @IsNumber()
    @IsNotEmpty()
    contentId: number;

    @ApiProperty({ description: 'الكلمات المفتاحية', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    keywords?: string[];

    @ApiProperty({ description: 'المواضيع', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    topics?: string[];

    @ApiProperty({ description: 'معدل التفاعل', required: false })
    @IsFloat()
    @IsOptional()
    engagement?: number;

    @ApiProperty({ description: 'درجة الملاءمة', required: false })
    @IsFloat()
    @IsOptional()
    relevanceScore?: number;

    @ApiProperty({ description: 'الفئات المستهدفة', required: false })
    @IsArray()
    @IsOptional()
    targetAudience?: any[];
} 