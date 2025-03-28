import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { ClientStatus } from '@prisma/client';

export class CreateAgentClientDto {
    @ApiProperty({ description: 'معرف الوكيل' })
    @IsNumber()
    agentId: number;

    @ApiProperty({ description: 'معرف العميل' })
    @IsNumber()
    clientId: number;

    @ApiProperty({ description: 'حالة العميل' })
    @IsEnum(ClientStatus)
    status: ClientStatus;

    @ApiProperty({ description: 'تاريخ بداية العلاقة', required: false })
    @IsString()
    @IsOptional()
    startDate?: string;

    @ApiProperty({ description: 'تاريخ نهاية العلاقة', required: false })
    @IsString()
    @IsOptional()
    endDate?: string;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 