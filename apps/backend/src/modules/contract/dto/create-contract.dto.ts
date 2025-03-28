import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

export enum ContractStatus {
    ACTIVE = 'ACTIVE',
    EXPIRED = 'EXPIRED',
    TERMINATED = 'TERMINATED',
    PENDING = 'PENDING'
}

export class CreateContractDto {
    @ApiProperty({ description: 'معرف اللاعب' })
    @IsNumber()
    playerId: number;

    @ApiProperty({ description: 'معرف النادي' })
    @IsNumber()
    clubId: number;

    @ApiProperty({ description: 'تاريخ بداية العقد' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية العقد' })
    @IsDate()
    endDate: Date;

    @ApiProperty({ description: 'قيمة العقد' })
    @IsNumber()
    salary: number;

    @ApiProperty({ description: 'شروط العقد' })
    @IsString()
    terms: string;

    @ApiProperty({ description: 'حالة العقد', enum: ContractStatus })
    @IsEnum(ContractStatus)
    status: ContractStatus;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 