import { IsString, IsNotEmpty, IsDate, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptimizationLogDto {
    @ApiProperty({ description: 'تاريخ التحسين' })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({ description: 'نوع التحسين' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: 'التغييرات المطبقة' })
    @IsObject()
    @IsNotEmpty()
    changes: Record<string, any>;

    @ApiProperty({ description: 'تأثير التغييرات' })
    @IsObject()
    @IsNotEmpty()
    impact: Record<string, any>;

    @ApiProperty({ description: 'المقاييس المتأثرة' })
    @IsObject()
    @IsNotEmpty()
    metrics: Record<string, any>;
} 