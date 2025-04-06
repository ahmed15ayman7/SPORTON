import { IsString, IsNotEmpty, IsEnum, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sport, CompetitionFormat, CompetitionStatus } from '@shared/prisma';

export class CreateCompetitionDto {
    @ApiProperty({ description: 'عنوان المسابقة' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'وصف المسابقة' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'الرياضة', enum: Sport })
    @IsEnum(Sport)
    @IsNotEmpty()
    sport: Sport;

    @ApiProperty({ description: 'تاريخ بداية المسابقة' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية المسابقة' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'صيغة المسابقة', enum: CompetitionFormat })
    @IsEnum(CompetitionFormat)
    @IsNotEmpty()
    format: CompetitionFormat;

    @ApiProperty({ description: 'قواعد المسابقة', required: false })
    @IsString()
    @IsOptional()
    rules?: string;

    @ApiProperty({ description: 'حالة المسابقة', enum: CompetitionStatus })
    @IsEnum(CompetitionStatus)
    @IsNotEmpty()
    status: CompetitionStatus;
} 