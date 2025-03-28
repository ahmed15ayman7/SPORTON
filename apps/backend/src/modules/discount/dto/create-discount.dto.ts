import { IsNumber, IsNotEmpty, IsBoolean, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscountDto {
    @ApiProperty({ description: 'معرف المنتج' })
    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @ApiProperty({ description: 'نسبة الخصم' })
    @IsNumber()
    @IsNotEmpty()
    percentage: number;

    @ApiProperty({ description: 'تاريخ بداية الخصم' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الخصم' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'هل الخصم نشط' })
    @IsBoolean()
    @IsOptional()
    active?: boolean;
} 