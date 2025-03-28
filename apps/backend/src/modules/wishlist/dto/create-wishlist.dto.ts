import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, IsOptional } from 'class-validator';

export class CreateWishlistDto {
    @ApiProperty({ description: 'معرف المستخدم' })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'معرفات المنتجات', type: [Number] })
    @IsArray()
    @IsInt({}, { each: true })
    @IsOptional()
    productIds?: number[];
} 