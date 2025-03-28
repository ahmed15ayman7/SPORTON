import { IsNumber, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RefundStatus, RefundReason } from '@prisma/client';

export class CreateRefundDto {
    @ApiProperty({ description: 'معرف الطلب' })
    @IsNumber()
    @IsNotEmpty()
    orderId: number;

    @ApiProperty({ description: 'المبلغ المراد إرجاعه' })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'سبب الإرجاع' })
    @IsEnum(RefundReason)
    @IsNotEmpty()
    reason: RefundReason;

    @ApiProperty({ description: 'حالة الإرجاع' })
    @IsEnum(RefundStatus)
    @IsNotEmpty()
    status: RefundStatus;

    @ApiProperty({ description: 'تفاصيل إضافية عن سبب الإرجاع (اختياري)' })
    @IsString()
    @IsOptional()
    details?: string;

    @ApiProperty({ description: 'ملاحظات الإرجاع (اختياري)' })
    @IsString()
    @IsOptional()
    notes?: string;
} 