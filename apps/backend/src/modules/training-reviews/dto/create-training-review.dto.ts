import { IsString, IsNotEmpty, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainingReviewDto {
    @ApiProperty({ description: 'معرف التدريب' })
    @IsNumber()
    @IsNotEmpty()
    trainingId: number;

    @ApiProperty({ description: 'معرف المراجع' })
    @IsNumber()
    @IsNotEmpty()
    reviewerId: number;

    @ApiProperty({ description: 'التقييم من 5', minimum: 1, maximum: 5 })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({ description: 'التعليق', required: false })
    @IsString()
    comment?: string;
} 