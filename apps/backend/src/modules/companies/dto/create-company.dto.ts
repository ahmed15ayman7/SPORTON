import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { CompanyType } from '@prisma/client';

export class CreateCompanyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({ enum: CompanyType })
    @IsNotEmpty()
    @IsEnum(CompanyType)
    type: CompanyType;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    registrationNo?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    website?: string;
} 