import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductVariantDto {
    @ApiProperty({ description: 'معرف المنتج' })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'المقاس' })
    @IsString()
    @IsOptional()
    size?: string;

    @ApiProperty({ description: 'اللون' })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiProperty({ description: 'رقم المنتج المميز' })
    @IsString()
    @IsNotEmpty()
    sku: string;

    @ApiProperty({ description: 'سعر خاص للمتغير' })
    @IsNumber()
    @IsOptional()
    price?: number;

    @ApiProperty({ description: 'الكمية المتوفرة' })
    @IsNumber()
    @IsOptional()
    inStock?: number;
} 