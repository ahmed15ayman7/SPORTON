import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventAgendaDto {
    @ApiProperty({ description: 'معرف الفعالية' })
    @IsNumber()
    @IsNotEmpty()
    eventId: number;

    @ApiProperty({ description: 'عنوان النشاط' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: 'وقت بداية النشاط' })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    startTime: Date;

    @ApiProperty({ description: 'وقت نهاية النشاط' })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    endTime: Date;

    @ApiProperty({ description: 'موقع النشاط' })
    @IsString()
    @IsOptional()
    location?: string;

    @ApiProperty({ description: 'المتحدث' })
    @IsString()
    @IsOptional()
    speaker?: string;
} 