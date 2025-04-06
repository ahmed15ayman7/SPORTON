import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsEnum } from 'class-validator';
import { NotificationType } from '@shared/prisma';

export class CreateNotificationTemplateDto {
    @ApiProperty({ description: 'نوع الإشعار' })
    @IsEnum(NotificationType)
    type: NotificationType;

    @ApiProperty({ description: 'قالب العنوان' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'قالب المحتوى' })
    @IsString()
    content: string;

    @ApiProperty({ description: 'المتغيرات المستخدمة في القالب' })
    @IsArray()
    @IsString({ each: true })
    variables: string[];

    @ApiProperty({ description: 'اللغة' })
    @IsString()
    language: string;

    @ApiProperty({ description: 'حالة القالب' })
    @IsBoolean()
    isActive: boolean;
} 