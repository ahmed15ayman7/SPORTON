import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventCategoryDto {
    @ApiProperty({ description: 'اسم الفئة' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'وصف الفئة' })
    @IsString()
    @IsOptional()
    description?: string;
} 