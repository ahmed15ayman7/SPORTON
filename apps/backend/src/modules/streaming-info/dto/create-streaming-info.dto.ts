import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class CreateStreamingInfoDto {
    @ApiProperty({ description: 'معرف الفعالية المرتبطة بالبث' })
    eventId: number;

    @ApiProperty({ description: 'منصة البث' })
    @IsString()
    platform: string;

    @ApiProperty({ description: 'رابط البث' })
    @IsString()
    url: string;

    @ApiProperty({ description: 'وقت بداية البث' })
    @IsDate()
    startTime: Date;

    @ApiProperty({ description: 'وقت نهاية البث' })
    @IsDate()
    endTime: Date;

    @ApiProperty({ description: 'هل البث مباشر حالياً', required: false })
    @IsBoolean()
    @IsOptional()
    isLive?: boolean;
} 