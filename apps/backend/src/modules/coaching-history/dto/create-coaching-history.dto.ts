import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, IsOptional, IsDate } from 'class-validator';

export class CreateCoachingHistoryDto {
    @ApiProperty({ description: 'معرف المدرب' })
    @IsNumber()
    coachId: number;

    @ApiProperty({ description: 'معرف النادي' })
    @IsNumber()
    clubId: number;

    @ApiProperty({ description: 'تاريخ بداية التدريب' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية التدريب', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'المنصب' })
    @IsString()
    position: string;

    @ApiProperty({ description: 'الإنجازات', type: [String] })
    @IsArray()
    @IsString({ each: true })
    achievements: string[];
} 