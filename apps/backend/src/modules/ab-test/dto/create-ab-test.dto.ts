import { IsString, IsNotEmpty, IsDate, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TestStatus } from '@shared/prisma';

export class CreateABTestDto {
    @ApiProperty({ description: 'اسم التجربة' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'وصف التجربة' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'تاريخ البداية' })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ description: 'تاريخ النهاية' })
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty({ description: 'حالة التجربة' })
    @IsNotEmpty()
    status: TestStatus;

    @ApiProperty({ description: 'المقاييس المتتبعة' })
    @IsObject()
    @IsNotEmpty()
    metrics: Record<string, any>;
} 