import { IsNumber, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReportType, ReportStatus } from '@prisma/client';

export class CreateReportDto {
    @ApiProperty({ description: 'معرف المستخدم الذي قام بالإبلاغ' })
    @IsNumber()
    @IsNotEmpty()
    reporterId: number;

    @ApiProperty({ description: 'معرف المستخدم الذي تم الإبلاغ عنه' })
    @IsNumber()
    @IsNotEmpty()
    reportedId: number;

    @ApiProperty({ description: 'نوع التقرير', enum: ReportType })
    @IsEnum(ReportType)
    @IsNotEmpty()
    type: ReportType;

    @ApiProperty({ description: 'وصف التقرير' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'حالة التقرير', enum: ReportStatus })
    @IsEnum(ReportStatus)
    @IsNotEmpty()
    status: ReportStatus;
} 