import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreatePostDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    video?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isAchievement?: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    authorId: number;
} 