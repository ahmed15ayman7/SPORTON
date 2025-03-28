import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventImageDto {
    @ApiProperty({ description: 'معرف الفعالية' })
    @IsNumber()
    @IsNotEmpty()
    eventId: number;

    @ApiProperty({ description: 'رابط الصورة' })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiProperty({ description: 'وصف الصورة' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'هل هي الصورة الرئيسية' })
    @IsBoolean()
    @IsOptional()
    isMain?: boolean;
} 