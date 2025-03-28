import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sport } from '@prisma/client';

export class CreateTeamDto {
    @ApiProperty({ description: 'اسم الفريق' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'الرياضة', enum: Sport })
    @IsEnum(Sport)
    @IsNotEmpty()
    sport: Sport;

    @ApiProperty({ description: 'الموقع' })
    @IsString()
    @IsNotEmpty()
    location: string;

    @ApiProperty({ description: 'وصف الفريق', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'شعار الفريق', required: false })
    @IsString()
    @IsOptional()
    logo?: string;

    @ApiProperty({ description: 'إنجازات الفريق', required: false })
    @IsString()
    @IsOptional()
    achievements?: string;
} 