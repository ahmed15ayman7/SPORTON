import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roomId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
} 