import { IsString, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSegmentDto {
    @ApiProperty({ description: 'اسم الفئة' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'معايير التقسيم' })
    @IsObject()
    @IsNotEmpty()
    criteria: Record<string, any>;

    @ApiProperty({ description: 'أولوية الفئة' })
    @IsNumber()
    @IsNotEmpty()
    priority: number;
} 