import { IsNumber, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShippingStatus, ShippingMethod } from '@prisma/client';

export class CreateShippingDto {
    @ApiProperty({ description: 'معرف الطلب' })
    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @ApiProperty({ description: 'طريقة الشحن' })
    @IsEnum(ShippingMethod)
    @IsNotEmpty()
    method: ShippingMethod;

    @ApiProperty({ description: 'حالة الشحن' })
    @IsEnum(ShippingStatus)
    @IsNotEmpty()
    status: ShippingStatus;

    @ApiProperty({ description: 'تكلفة الشحن' })
    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ description: 'رقم التتبع (اختياري)' })
    @IsString()
    @IsOptional()
    trackingNumber?: string;

    @ApiProperty({ description: 'تاريخ الشحن المتوقع (اختياري)' })
    @IsString()
    @IsOptional()
    estimatedDeliveryDate?: string;

    @ApiProperty({ description: 'ملاحظات الشحن (اختياري)' })
    @IsString()
    @IsOptional()
    notes?: string;
} 