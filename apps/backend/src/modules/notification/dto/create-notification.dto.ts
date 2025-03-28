import { IsNumber, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType, NotificationStatus } from '@prisma/client';

export class CreateNotificationDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'نوع الإشعار' })
    @IsEnum(NotificationType)
    @IsNotEmpty()
    type: NotificationType;

    @ApiProperty({ description: 'عنوان الإشعار' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'محتوى الإشعار' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'حالة الإشعار' })
    @IsEnum(NotificationStatus)
    @IsNotEmpty()
    status: NotificationStatus;

    @ApiProperty({ description: 'رابط الإشعار (اختياري)' })
    @IsString()
    @IsOptional()
    link?: string;

    @ApiProperty({ description: 'بيانات إضافية للإشعار (اختياري)' })
    @IsString()
    @IsOptional()
    data?: string;
} 