import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ description: 'اسم الفئة' })
    @IsString()
    @IsNotEmpty()
    name: string;
} 