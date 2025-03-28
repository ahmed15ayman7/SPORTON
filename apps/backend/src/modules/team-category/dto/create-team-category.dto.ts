import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTeamCategoryDto {
    @ApiProperty({ description: 'اسم الفئة' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'وصف الفئة' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'الحد الأدنى للعمر' })
    @IsNumber()
    minAge: number;

    @ApiProperty({ description: 'الحد الأقصى للعمر' })
    @IsNumber()
    maxAge: number;

    @ApiProperty({ description: 'الحد الأقصى لعدد اللاعبين', required: false })
    @IsNumber()
    @IsOptional()
    maxPlayers?: number;

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
} 