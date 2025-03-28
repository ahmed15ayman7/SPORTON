import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
    @ApiProperty({ description: 'عنوان المقال' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'محتوى المقال' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'معرف المؤلف' })
    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @ApiProperty({ description: 'الفئات', type: [Number], required: false })
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    categoryIds?: number[];

    @ApiProperty({ description: 'الوسوم', type: [String], required: false })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiProperty({ description: 'صورة مصغرة', required: false })
    @IsOptional()
    @IsString()
    thumbnail?: string;
} 