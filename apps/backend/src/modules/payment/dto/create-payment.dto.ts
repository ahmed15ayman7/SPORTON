import { IsNumber, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentMethod } from '@prisma/client';

export class CreatePaymentDto {
    @ApiProperty({ description: 'معرف الطلب' })
    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @ApiProperty({ description: 'المبلغ' })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'طريقة الدفع' })
    @IsEnum(PaymentMethod)
    @IsNotEmpty()
    method: PaymentMethod;

    @ApiProperty({ description: 'حالة الدفع' })
    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    status: PaymentStatus;

    @ApiProperty({ description: 'معرف المعاملة (اختياري)' })
    @IsString()
    @IsOptional()
    transactionId?: string;

    @ApiProperty({ description: 'ملاحظات الدفع (اختياري)' })
    @IsString()
    @IsOptional()
    notes?: string;
} 