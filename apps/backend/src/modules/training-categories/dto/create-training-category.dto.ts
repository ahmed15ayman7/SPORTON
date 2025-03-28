import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingCategoryDto {
    @ApiProperty({ description: 'اسم الفئة' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'وصف الفئة', required: false })
    @IsString()
    @IsOptional()
    description?: string;
} 