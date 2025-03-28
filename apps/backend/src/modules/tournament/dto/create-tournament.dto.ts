import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsArray } from 'class-validator';

export class CreateTournamentDto {
    @ApiProperty({ description: 'اسم البطولة' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'وصف البطولة' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'تاريخ بداية البطولة' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية البطولة' })
    @IsDate()
    endDate: Date;

    @ApiProperty({ description: 'معرف المنشأة' })
    @IsNumber()
    facilityId: number;

    @ApiProperty({ description: 'معرف فئة الفريق' })
    @IsNumber()
    teamCategoryId: number;

    @ApiProperty({ description: 'الحد الأقصى لعدد الفرق' })
    @IsNumber()
    maxTeams: number;

    @ApiProperty({ description: 'قواعد البطولة', type: [String] })
    @IsArray()
    @IsString({ each: true })
    rules: string[];

    @ApiProperty({ description: 'الجوائز', required: false })
    @IsString()
    @IsOptional()
    prizes?: string;

    @ApiProperty({ description: 'رسوم المشاركة', required: false })
    @IsNumber()
    @IsOptional()
    entryFee?: number;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 