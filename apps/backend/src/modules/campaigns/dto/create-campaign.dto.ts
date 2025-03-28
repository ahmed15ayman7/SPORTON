import { IsString, IsNotEmpty, IsNumber, IsDate, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from '@prisma/client';

export class CreateCampaignDto {
    @ApiProperty({ description: 'اسم الحملة' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'وصف الحملة' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'تاريخ بداية الحملة' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية الحملة' })
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ description: 'الميزانية الكلية للحملة' })
    @IsNumber()
    @IsNotEmpty()
    budget: number;

    @ApiProperty({ description: 'حالة الحملة', enum: CampaignStatus })
    @IsEnum(CampaignStatus)
    @IsNotEmpty()
    status: CampaignStatus;
} 