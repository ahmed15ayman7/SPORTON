import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@shared/prisma';

export class CreateContentScoreDto {
    @ApiProperty({ description: 'معرف المحتوى' })
    @IsNumber()
    @IsNotEmpty()
    contentId: number;

    @ApiProperty({ description: 'نوع المحتوى' })
    @IsNotEmpty()
    contentType: ContentType;

    @ApiProperty({ description: 'فئة المستخدم' })
    @IsString()
    @IsNotEmpty()
    userSegment: string;

    @ApiProperty({ description: 'درجة الملاءمة' })
    @IsNumber()
    @IsNotEmpty()
    relevanceScore: number;

    @ApiProperty({ description: 'درجة الحداثة' })
    @IsNumber()
    @IsNotEmpty()
    freshness: number;

    @ApiProperty({ description: 'درجة الجودة' })
    @IsNumber()
    @IsNotEmpty()
    quality: number;

    @ApiProperty({ description: 'درجة التفاعل' })
    @IsNumber()
    @IsNotEmpty()
    engagement: number;

    @ApiProperty({ description: 'الدرجة النهائية' })
    @IsNumber()
    @IsNotEmpty()
    finalScore: number;
} 