import { IsNumber, IsNotEmpty, IsFloat, IsDate } from 'class-validator';
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
    @IsFloat()
    @IsNotEmpty()
    performance: number;

    @ApiProperty({ description: 'التكلفة' })
    @IsFloat()
    @IsNotEmpty()
    cost: number;

    @ApiProperty({ description: 'العائد على الاستثمار' })
    @IsFloat()
    @IsNotEmpty()
    roi: number;

    @ApiProperty({ description: 'التاريخ' })
    @IsDate()
    @IsNotEmpty()
    date: Date;
} 