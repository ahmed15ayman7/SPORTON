import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateNotificationSettingsDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'تفعيل إشعارات البريد الإلكتروني' })
    @IsBoolean()
    @IsOptional()
    emailEnabled?: boolean;

    @ApiProperty({ description: 'تفعيل الإشعارات الفورية' })
    @IsBoolean()
    @IsOptional()
    pushEnabled?: boolean;

    @ApiProperty({ description: 'تفعيل إشعارات الرسائل النصية' })
    @IsBoolean()
    @IsOptional()
    smsEnabled?: boolean;

    @ApiProperty({ description: 'تفعيل إشعارات الرسائل' })
    @IsBoolean()
    @IsOptional()
    messageNotifications?: boolean;

    @ApiProperty({ description: 'تفعيل إشعارات الانتقالات' })
    @IsBoolean()
    @IsOptional()
    transferNotifications?: boolean;

    @ApiProperty({ description: 'تفعيل إشعارات المباريات' })
    @IsBoolean()
    @IsOptional()
    matchNotifications?: boolean;

    @ApiProperty({ description: 'تفعيل إشعارات التدريب' })
    @IsBoolean()
    @IsOptional()
    trainingNotifications?: boolean;

    @ApiProperty({ description: 'تفعيل إشعارات الأخبار' })
    @IsBoolean()
    @IsOptional()
    newsNotifications?: boolean;

    @ApiProperty({ description: 'تفعيل إشعارات العقود' })
    @IsBoolean()
    @IsOptional()
    contractNotifications?: boolean;

    @ApiProperty({ description: 'بداية ساعات الهدوء', required: false })
    @IsOptional()
    quietHoursStart?: Date;

    @ApiProperty({ description: 'نهاية ساعات الهدوء', required: false })
    @IsOptional()
    quietHoursEnd?: Date;

    @ApiProperty({ description: 'المنطقة الزمنية' })
    @IsString()
    @IsOptional()
    timezone?: string;
} 