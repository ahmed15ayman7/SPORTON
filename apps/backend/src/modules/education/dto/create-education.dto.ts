import { IsString, IsNotEmpty, IsDate, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationDto {
    @ApiProperty({ description: 'المؤسسة التعليمية' })
    @IsString()
    @IsNotEmpty()
    institution: string;

    @ApiProperty({ description: 'الدرجة العلمية' })
    @IsString()
    @IsNotEmpty()
    degree: string;

    @ApiProperty({ description: 'التخصص', required: false })
    @IsString()
    @IsOptional()
    field?: string;

    @ApiProperty({ description: 'تاريخ بداية الدراسة' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الدراسة', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'الدرجة', required: false })
    @IsString()
    @IsOptional()
    grade?: string;

    @ApiProperty({ description: 'الأنشطة', required: false })
    @IsString()
    @IsOptional()
    activities?: string;

    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
} 