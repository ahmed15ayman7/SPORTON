import { IsString, IsNotEmpty, IsDate, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
    @ApiProperty({ description: 'عنوان الخبرة' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'المنظمة' })
    @IsString()
    @IsNotEmpty()
    organization: string;

    @ApiProperty({ description: 'الموقع', required: false })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ description: 'تاريخ بداية الخبرة' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الخبرة', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'هل الخبرة مستمرة', default: false })
    @IsBoolean()
    @IsOptional()
    current?: boolean;

    @ApiProperty({ description: 'وصف الخبرة', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'الإنجازات', required: false })
    @IsString()
    @IsOptional()
    achievements?: string;

    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
} 