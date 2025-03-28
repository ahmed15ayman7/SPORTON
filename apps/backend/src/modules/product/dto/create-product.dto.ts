import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray, IsEnum, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sport } from '@prisma/client';

export class CreateProductDto {
    @ApiProperty({ description: 'اسم المنتج' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'وصف المنتج' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'سعر المنتج' })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({ description: 'معرف فئة المنتج' })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @ApiProperty({ description: 'العلامة التجارية' })
    @IsString()
    @IsOptional()
    brand?: string;

    @ApiProperty({ description: 'الرياضة المتعلقة' })
    @IsEnum(Sport)
    @IsNotEmpty()
    sport: Sport;

    @ApiProperty({ description: 'الكمية المتوفرة' })
    @IsNumber()
    @IsNotEmpty()
    inStock: number;

    @ApiProperty({ description: 'مواصفات المنتج' })
    @IsObject()
    @IsOptional()
    specifications?: Record<string, any>;

    @ApiProperty({ description: 'وزن المنتج للشحن' })
    @IsNumber()
    @IsOptional()
    weight?: number;

    @ApiProperty({ description: 'هل المنتج مميز' })
    @IsBoolean()
    @IsOptional()
    featured?: boolean;
} 