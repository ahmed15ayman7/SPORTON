import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsEnum, IsDate } from 'class-validator';
import { DeliveryStatus, NotificationChannel } from '@shared/prisma';
export class CreateNotificationLogDto {
    @ApiProperty({ description: 'الخطأ' })
    @IsString()
    error: string | null;
    @ApiProperty({ description: 'المعرف' })
    @IsNumber()
    notificationId: number;
    @ApiProperty({ description: 'الحالة' })
    @IsString()
    @IsEnum(DeliveryStatus)
    status: DeliveryStatus;
    @ApiProperty({ description: 'القناة' })
    @IsString()
    @IsEnum(NotificationChannel)
    channel: NotificationChannel;
    @ApiProperty({ description: 'المحاولات' })
    @IsNumber()
    attempts: number;
    @ApiProperty({ description: 'الوقت' })
    @IsDate()
    sentAt: Date;
} 