import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
    @ApiProperty({ description: 'معرف الطلب' })
    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @ApiProperty({ description: 'معرف المنتج' })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'معرف متغير المنتج (اختياري)' })
    @IsNumber()
    @IsOptional()
    variantId?: number;

    @ApiProperty({ description: 'الكمية' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ description: 'سعر الوحدة' })
    @IsNumber()
    @IsNotEmpty()
    unitPrice: number;
} 