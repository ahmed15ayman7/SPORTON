import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @ApiProperty({ required: false, minimum: 0 })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    skip?: number;

    @ApiProperty({ required: false, minimum: 1 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    take?: number;

    @ApiProperty({ required: false })
    @IsOptional()
    orderBy?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    search?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    filters?: string;
} 