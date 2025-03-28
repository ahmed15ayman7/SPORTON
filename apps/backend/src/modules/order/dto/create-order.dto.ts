import { IsNumber, IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
    @ApiProperty({ description: 'معرف المنتج' })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'الكمية' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ description: 'معرف متغير المنتج (اختياري)' })
    @IsNumber()
    @IsOptional()
    variantId?: number;
}

export class CreateOrderDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'معرف العنوان' })
    @IsNumber()
    @IsNotEmpty()
    addressId: number;

    @ApiProperty({ description: 'منتجات الطلب' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @IsNotEmpty()
    items: OrderItemDto[];

    @ApiProperty({ description: 'ملاحظات الطلب' })
    @IsString()
    @IsOptional()
    notes?: string;
} 