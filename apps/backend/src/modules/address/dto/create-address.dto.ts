import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateAddressDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    userId: number;

    @ApiProperty({ description: 'اسم المستلم' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'الشارع' })
    @IsString()
    street: string;

    @ApiProperty({ description: 'المدينة' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'المحافظة/الولاية' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'الدولة' })
    @IsString()
    country: string;

    @ApiProperty({ description: 'الرمز البريدي', required: false })
    @IsString()
    @IsOptional()
    zipCode?: string;

    @ApiProperty({ description: 'رقم الهاتف' })
    @IsString()
    phone: string;

    @ApiProperty({ description: 'هل هو العنوان الافتراضي', required: false })
    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
} 