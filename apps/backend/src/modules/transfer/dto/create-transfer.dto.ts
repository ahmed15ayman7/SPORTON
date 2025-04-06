import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsDate } from 'class-validator';
import { TransferStatus } from '@shared/prisma';

export class CreateTransferDto {
    @ApiProperty({ description: 'معرف اللاعب' })
    @IsNumber()
    playerId: number;

    @ApiProperty({ description: 'معرف الفريق المصدر' })
    @IsNumber()
    sourceTeamId: number;

    @ApiProperty({ description: 'معرف الفريق الهدف' })
    @IsNumber()
    targetTeamId: number;

    @ApiProperty({ description: 'حالة النقل' })
    @IsEnum(TransferStatus)
    status: TransferStatus;

    @ApiProperty({ description: 'تاريخ بداية النقل' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية النقل', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'قيمة النقل', required: false })
    @IsNumber()
    @IsOptional()
    transferFee?: number;

    @ApiProperty({ description: 'شروط النقل', required: false })
    @IsString()
    @IsOptional()
    terms?: string;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 