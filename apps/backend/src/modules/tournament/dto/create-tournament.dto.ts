import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsArray, IsEnum } from 'class-validator';
import { TournamentStatus, TournamentType } from '@shared/prisma';
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

    @ApiProperty({ description: 'قواعد البطولة' })
    @IsString()
    rules: string;

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

    @ApiProperty({ description: 'الحالة', required: false })
    @IsEnum(TournamentStatus)
    status: TournamentStatus;

    @ApiProperty({ description: 'المنشأة', required: false })
    @IsNumber()
    @IsOptional()
    organizerId: number;

    @ApiProperty({ description: 'النوع', required: false })
    @IsEnum(TournamentType)
    type: TournamentType;
} 