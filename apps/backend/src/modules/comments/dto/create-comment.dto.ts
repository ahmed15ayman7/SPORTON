import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty({ description: 'محتوى التعليق' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: 'معرف المستخدم الذي كتب التعليق' })
    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @ApiProperty({ description: 'معرف المقال المرتبط بالتعليق' })
    @IsNumber()
    @IsNotEmpty()
    articleId: number;
} 