import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsDate, IsArray } from 'class-validator';
import { TrainingLevel } from '@prisma/client';

export class CreateTrainingScheduleDto {
    @ApiProperty({ description: 'معرف الفريق' })
    @IsNumber()
    teamId: number;

    @ApiProperty({ description: 'معرف المدرب' })
    @IsNumber()
    coachId: number;

    @ApiProperty({ description: 'معرف المنشأة' })
    @IsNumber()
    facilityId: number;

    @ApiProperty({ description: 'مستوى التدريب' })
    @IsEnum(TrainingLevel)
    level: TrainingLevel;

    @ApiProperty({ description: 'تاريخ بداية التدريب' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية التدريب' })
    @IsDate()
    endDate: Date;

    @ApiProperty({ description: 'أوقات التدريب' })
    @IsArray()
    @IsString({ each: true })
    trainingTimes: string[];

    @ApiProperty({ description: 'أيام التدريب' })
    @IsArray()
    @IsString({ each: true })
    trainingDays: string[];

    @ApiProperty({ description: 'حالة التدريب' })
    @IsString()
    status: string;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 