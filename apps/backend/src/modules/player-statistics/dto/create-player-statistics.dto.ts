import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePlayerStatisticsDto {
    @ApiProperty({ description: 'معرف اللاعب' })
    @IsNumber()
    playerId: number;

    @ApiProperty({ description: 'عدد المباريات' })
    @IsNumber()
    matches: number;

    @ApiProperty({ description: 'عدد الأهداف' })
    @IsNumber()
    goals: number;

    @ApiProperty({ description: 'عدد التمريرات الحاسمة' })
    @IsNumber()
    assists: number;

    @ApiProperty({ description: 'عدد البطاقات الصفراء' })
    @IsNumber()
    yellowCards: number;

    @ApiProperty({ description: 'عدد البطاقات الحمراء' })
    @IsNumber()
    redCards: number;

    @ApiProperty({ description: 'دقائق اللعب' })
    @IsNumber()
    minutesPlayed: number;

    @ApiProperty({ description: 'دقة التمريرات', required: false })
    @IsNumber()
    @IsOptional()
    passAccuracy?: number;

    @ApiProperty({ description: 'دقة التسديد', required: false })
    @IsNumber()
    @IsOptional()
    shotAccuracy?: number;

    @ApiProperty({ description: 'عدد التدخلات' })
    @IsNumber()
    tackles: number;

    @ApiProperty({ description: 'الموسم' })
    @IsString()
    season: string;
} 