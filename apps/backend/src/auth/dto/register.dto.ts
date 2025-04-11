import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty({ type: "string" })
    email: string;
    @ApiProperty({ type: "string" })
    phone: string;
    @ApiProperty({ type: "string" })
    password: string;
    @ApiProperty({ type: "string" })
    role: "PLAYER" | "COACH" | "CLUB" | "AGENT" | "SCOUT" | "COMPANY"; // حسب enum Role عندك
    @ApiProperty({ type: "string" })
    name: string;
    @ApiProperty({ type: "string", nullable: true })
    image?: string;
    @ApiProperty({ type: "string", nullable: true })
    country?: string;
    @ApiProperty({ type: "string", nullable: true })
    city?: string;
    @ApiProperty({ type: "string", nullable: true })
    language?: string;
}
