import { IsNumber, IsNotEmpty, IsDate, IsString, IsArray, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlanType, SubscriptionStatus } from '@prisma/client';

export class CreateSubscriptionDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'نوع الخطة', enum: PlanType })
    @IsEnum(PlanType)
    @IsNotEmpty()
    plan: PlanType;

    @ApiProperty({ description: 'تاريخ بداية الاشتراك' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الاشتراك' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'حالة الاشتراك', enum: SubscriptionStatus })
    @IsEnum(SubscriptionStatus)
    @IsNotEmpty()
    status: SubscriptionStatus;

    @ApiProperty({ description: 'المميزات المتاحة' })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    features: string[];
} 