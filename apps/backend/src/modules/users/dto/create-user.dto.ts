import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsEnum, IsPhoneNumber } from 'class-validator';
import { Role, UserStatus } from '@prisma/client';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ enum: Role })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @ApiProperty({ enum: UserStatus, required: false })
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    language?: string;
} 