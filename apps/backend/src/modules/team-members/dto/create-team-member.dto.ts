import { IsString, IsNotEmpty, IsDate, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMemberDto {
    @ApiProperty({ description: 'معرف الفريق' })
    @IsNumber()
    @IsNotEmpty()
    teamId: number;

    @ApiProperty({ description: 'معرف المستخدم' })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'الدور في الفريق' })
    @IsString()
    @IsNotEmpty()
    role: string;

    @ApiProperty({ description: 'تاريخ بداية العضوية' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ نهاية العضوية', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'هل العضوية حالية', default: true })
    @IsBoolean()
    @IsOptional()
    current?: boolean;
} 