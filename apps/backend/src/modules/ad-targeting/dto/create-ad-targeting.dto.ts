import { IsNumber, IsNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdTargetingDto {
    @ApiProperty({ description: 'معرف الإعلان' })
    @IsNumber()
    @IsNotEmpty()
    adId: number;

    @ApiProperty({ description: 'الاهتمامات المستهدفة', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    targetInterests?: string[];

    @ApiProperty({ description: 'السلوكيات المستهدفة', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    targetBehaviors?: string[];

    @ApiProperty({ description: 'البيانات الديموغرافية', required: false })
    @IsOptional()
    demographicData?: any;

    @ApiProperty({ description: 'البيانات الجغرافية', required: false })
    @IsOptional()
    locationData?: any;

    @ApiProperty({ description: 'أوقات العرض المفضلة', required: false })
    @IsOptional()
    timeTargeting?: any;

    @ApiProperty({ description: 'درجة الأداء', required: false })
    @IsNumber()
    @IsOptional()
    performanceScore?: number;

    @ApiProperty({ description: 'قواعد التحسين', required: false })
    @IsOptional()
    optimizationRules?: any;

    @ApiProperty({ description: 'استراتيجية المزايدة' })
    @IsString()
    @IsNotEmpty()
    bidStrategy: string;

    @ApiProperty({ description: 'الميزانية' })
    @IsNumber()
    @IsNotEmpty()
    budget: number;

    @ApiProperty({ description: 'الحد الأدنى للأداء' })
    @IsNumber()
    @IsNotEmpty()
    minPerformanceScore: number;

    @ApiProperty({ description: 'القائمة السوداء', type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    blacklist?: string[];

    @ApiProperty({ description: 'القواعد المخصصة', required: false })
    @IsOptional()
    customRules?: any;
} 