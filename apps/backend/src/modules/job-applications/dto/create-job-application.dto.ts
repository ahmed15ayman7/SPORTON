import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateJobApplicationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    jobId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    applicantId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    status?: string;
} 