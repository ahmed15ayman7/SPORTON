import { IsNumber, IsNotEmpty, IsFloat, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContentType } from '@prisma/client';

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
    @IsFloat()
    @IsNotEmpty()
    relevanceScore: number;

    @ApiProperty({ description: 'درجة الحداثة' })
    @IsFloat()
    @IsNotEmpty()
    freshness: number;

    @ApiProperty({ description: 'درجة الجودة' })
    @IsFloat()
    @IsNotEmpty()
    quality: number;

    @ApiProperty({ description: 'درجة التفاعل' })
    @IsFloat()
    @IsNotEmpty()
    engagement: number;

    @ApiProperty({ description: 'الدرجة النهائية' })
    @IsFloat()
    @IsNotEmpty()
    finalScore: number;
} 