import { Controller, Post, Body, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Login with email and password' })
    @ApiResponse({ status: 200, description: 'Return JWT tokens.' })
    async login(@Body() loginDto: { email: string; password: string }) {
        const user = await this.authService.validateUser(
            loginDto.email,
            loginDto.password,
        );
        if (!user) {
            return { statusCode: 401, message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Return new JWT tokens.' })
    async refresh(@Body() body: { refresh_token: string }) {
        return this.authService.refreshToken(body.refresh_token);
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Login with Google' })
    async googleAuth() {
        // Google authentication will redirect to googleAuthRedirect
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Google auth callback' })
    async googleAuthRedirect(@Req() req, @Res() res) {
        const user = await this.authService.validateOAuthUser(req.user);
        const { access_token, refresh_token } = await this.authService.login(user);
        res.redirect(
            `${process.env.FRONTEND_URL}/auth/callback?access_token=${access_token}&refresh_token=${refresh_token}`,
        );
    }

    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    @ApiOperation({ summary: 'Login with Facebook' })
    async facebookAuth() {
        // Facebook authentication will redirect to facebookAuthRedirect
    }

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    @ApiOperation({ summary: 'Facebook auth callback' })
    async facebookAuthRedirect(@Req() req, @Res() res) {
        const user = await this.authService.validateOAuthUser(req.user);
        const { access_token, refresh_token } = await this.authService.login(user);
        res.redirect(
            `${process.env.FRONTEND_URL}/auth/callback?access_token=${access_token}&refresh_token=${refresh_token}`,
        );
    }
} 