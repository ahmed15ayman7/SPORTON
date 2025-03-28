import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateNotificationGroupDto {
    @ApiProperty({ description: 'اسم مجموعة الإشعارات' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'وصف مجموعة الإشعارات', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'قائمة معرفات الإشعارات في المجموعة', type: [Number] })
    @IsArray()
    notificationIds: number[];
} 