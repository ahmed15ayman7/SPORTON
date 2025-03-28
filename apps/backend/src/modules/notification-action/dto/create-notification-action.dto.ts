import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ActionType } from '@prisma/client';

export class CreateNotificationActionDto {
    @ApiProperty({ description: 'معرف الإشعار المرتبط بالإجراء' })
    notificationId: number;

    @ApiProperty({ description: 'نوع الإجراء', enum: ActionType })
    @IsEnum(ActionType)
    actionType: ActionType;

    @ApiProperty({ description: 'رابط الإجراء', required: false })
    @IsString()
    @IsOptional()
    actionUrl?: string;

    @ApiProperty({ description: 'نص زر الإجراء', required: false })
    @IsString()
    @IsOptional()
    buttonText?: string;
} 