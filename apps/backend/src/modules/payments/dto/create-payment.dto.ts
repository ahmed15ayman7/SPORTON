import { IsNumber, IsNotEmpty, IsDate, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType, PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'المبلغ' })
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ description: 'نوع الدفع', enum: PaymentType })
    @IsEnum(PaymentType)
    @IsNotEmpty()
    type: PaymentType;

    @ApiProperty({ description: 'حالة الدفع', enum: PaymentStatus })
    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    status: PaymentStatus;

    @ApiProperty({ description: 'تاريخ الدفع' })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: 'وصف الدفع', required: false })
    @IsString()
    @IsOptional()
    description?: string;
} 