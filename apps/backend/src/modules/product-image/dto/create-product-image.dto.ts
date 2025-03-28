import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductImageDto {
    @ApiProperty({ description: 'معرف المنتج' })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'رابط الصورة' })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ description: 'هل هي الصورة الرئيسية' })
    @IsBoolean()
    @IsOptional()
    isMain?: boolean;

    @ApiProperty({ description: 'ترتيب الصور' })
    @IsNumber()
    @IsOptional()
    order?: number;
} 