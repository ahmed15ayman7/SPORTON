import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBlockListDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    blockerId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    blockedId: number;
} 