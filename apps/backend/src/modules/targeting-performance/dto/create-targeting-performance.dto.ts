import { IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTargetingPerformanceDto {
    @ApiProperty({ description: 'معرف الاستهداف' })
    @IsNumber()
    @IsNotEmpty()
    targetingId: number;

    @ApiProperty({ description: 'معرف الفئة' })
    @IsNumber()
    @IsNotEmpty()
    segmentId: number;

    @ApiProperty({ description: 'الأداء' })
    @IsNumber()
    @IsNotEmpty()
    performance: number;

    @ApiProperty({ description: 'التكلفة' })
    @IsNumber()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ description: 'العائد على الاستثمار' })
    @IsNumber()
    @IsNotEmpty()
    roi: number;

    @ApiProperty({ description: 'التاريخ' })
    @IsDate()
    @IsNotEmpty()
    date: Date;
} 