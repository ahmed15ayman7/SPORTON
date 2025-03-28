import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CartItemDto {
    @ApiProperty({ description: 'معرف المنتج' })
    @IsInt()
    productId: number;

    @ApiProperty({ description: 'معرف المتغير (اختياري)' })
    @IsInt()
    @IsOptional()
    variantId?: number;

    @ApiProperty({ description: 'الكمية' })
    @IsInt()
    quantity: number;
}

export class CreateCartDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'عناصر السلة', type: [CartItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    @IsOptional()
    items?: CartItemDto[];
} 