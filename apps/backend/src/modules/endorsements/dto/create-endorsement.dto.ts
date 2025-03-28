import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEndorsementDto {
    @ApiProperty({ description: 'المهارة التي يتم التزكية عليها' })
    @IsString()
    @IsNotEmpty()
    skill: string;

    @ApiProperty({ description: 'معرف المستخدم المزكي' })
    @IsNumber()
    @IsNotEmpty()
    endorserId: number;

    @ApiProperty({ description: 'معرف المستخدم المستلم للتزكية' })
    @IsNumber()
    @IsNotEmpty()
    recipientId: number;
} 