import { IsString, IsNotEmpty, IsNumber, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@shared/prisma';

export class CreateCommissionDto {
    @ApiProperty({ description: 'محتوى التعليق' })
    @IsNumber()
    agentId: number;
    @IsNumber()
    transferId: number;
    @IsNumber()
    amount: number;
    @IsNumber()
    percentage: number;
    @IsString()
    currency: string;
    @IsDate()
    paymentDate: Date;
    @IsEnum(PaymentStatus)
    status: PaymentStatus;
} 