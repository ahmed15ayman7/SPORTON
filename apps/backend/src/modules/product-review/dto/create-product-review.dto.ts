import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductReviewDto {
    @ApiProperty({ description: 'معرف المنتج' })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'التقييم من 5' })
    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @ApiProperty({ description: 'التعليق' })
    @IsString()
    @IsOptional()
    comment?: string;

    @ApiProperty({ description: 'صور المراجعة' })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

    @ApiProperty({ description: 'هل المشتري حقيقي' })
    @IsBoolean()
    @IsOptional()
    verified?: boolean;
} 