import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @ApiProperty({ description: 'معرف المنتج' })
    @IsInt()
    productId: number;

    @ApiProperty({ description: 'معرف المستخدم' })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'التقييم من 1 إلى 5' })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({ description: 'تعليق التقييم', required: false })
    @IsString()
    @IsOptional()
    comment?: string;

    @ApiProperty({ description: 'صور المراجعة', required: false })
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
} 