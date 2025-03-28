import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CreateSocialMediaDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'منصة التواصل الاجتماعي' })
    @IsString()
    platform: string;

    @ApiProperty({ description: 'رابط الحساب' })
    @IsString()
    url: string;
} 