import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDto {
    @ApiProperty({ description: 'اسم الفئة' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'وصف الفئة' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'صورة الفئة' })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({ description: 'معرف الفئة الأب' })
    @IsNumber()
    @IsOptional()
    parentId?: number;
} 