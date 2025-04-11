import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@shared/prisma';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.generateRefreshToken(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.create(registerDto);
        return this.login(user);
    }

    async refreshToken(token: string) {
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
            const user = await this.usersService.findOne(payload.sub);
            if (!user) {
                throw new UnauthorizedException();
            }
            return this.login(user);
        } catch {
            throw new UnauthorizedException();
        }
    }

    private generateRefreshToken(payload: any): string {
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        });
    }

    async validateOAuthUser(profile: any): Promise<User> {
        let user = await this.usersService.findByEmail(profile.email);
        if (!user) {
            user = await this.usersService.create({
                email: profile.email,
                name: profile.name,
                password: Math.random().toString(36).slice(-8),
                role: 'PLAYER',
                phone: '',
                status: 'ACTIVE',
            });
        }
        return user;
    }
} 