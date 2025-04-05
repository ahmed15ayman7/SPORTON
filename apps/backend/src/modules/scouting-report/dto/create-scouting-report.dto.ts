import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsDate, IsObject } from 'class-validator';
export class CreateScoutingReportDto {
    @ApiProperty({ description: 'معرف الكشاف' })
    @IsNumber()
    scoutId: number;

    @ApiProperty({ description: 'معرف اللاعب' })
    @IsNumber()
    playerId: number;

    @ApiProperty({ description: 'معرف المباراة', required: false })
    @IsNumber()
    @IsOptional()
    matchId?: number;

    @ApiProperty({ description: 'تاريخ التقرير' })
    @IsDate()
    date: Date;

    @ApiProperty({ description: 'التقييم الفني' })
    @IsObject()
    technicalEvaluation: any;

    @ApiProperty({ description: 'التقييم البدني' })
    @IsObject()
    physicalEvaluation: any;

    @ApiProperty({ description: 'التقييم الذهني' })
    @IsObject()
    mentalEvaluation: any;

    @ApiProperty({ description: 'التقييم المستقبلي (1-100)' })
    @IsNumber()
    potential: number;

    @ApiProperty({ description: 'التوصية' })
    @IsString()
    recommendation: string;

    @ApiProperty({ description: 'فيديوهات التقييم', required: false })
    @IsString({ each: true })
    @IsOptional()
    videos?: string[];

    @ApiProperty({ description: 'ملاحظات إضافية', required: false })
    @IsString()
    @IsOptional()
    notes?: string;

} 