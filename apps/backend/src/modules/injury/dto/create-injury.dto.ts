import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

export enum InjurySeverity {
    MILD = 'MILD',
    MODERATE = 'MODERATE',
    SEVERE = 'SEVERE'
}

export enum InjuryStatus {
    ACTIVE = 'ACTIVE',
    RECOVERING = 'RECOVERING',
    RECOVERED = 'RECOVERED'
}

export class CreateInjuryDto {
    @ApiProperty({ description: 'معرف اللاعب' })
    @IsNumber()
    playerId: number;

    @ApiProperty({ description: 'نوع الإصابة' })
    @IsString()
    type: string;

    @ApiProperty({ description: 'وصف الإصابة' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'تاريخ الإصابة' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ التعافي المتوقع', required: false })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'شدة الإصابة', enum: InjurySeverity })
    @IsEnum(InjurySeverity)
    severity: InjurySeverity;

    @ApiProperty({ description: 'حالة الإصابة', enum: InjuryStatus })
    @IsEnum(InjuryStatus)
    status: InjuryStatus;

    @ApiProperty({ description: 'العلاج المتبع', required: false })
    @IsString()
    @IsOptional()
    treatment?: string;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    doctor?: string;

    @ApiProperty({ description: 'التقرير الطبي', required: false })
    @IsString()
    @IsOptional()
    medicalReport?: string;

} 