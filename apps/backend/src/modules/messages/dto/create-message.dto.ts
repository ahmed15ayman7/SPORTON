import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    mediaUrl?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    senderId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    recipientId: number;
} 