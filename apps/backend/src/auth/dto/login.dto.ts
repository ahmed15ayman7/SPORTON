import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ type: "string" })
    email: string;
    @ApiProperty({ type: "string" })
    password: string;
}
