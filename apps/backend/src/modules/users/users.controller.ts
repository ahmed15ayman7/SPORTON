import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController extends BaseController<User> {
    constructor(private readonly usersService: UsersService) {
        super(usersService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return user profile.' })
    async getUserProfile(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserProfile(id);
    }

    @Get(':id/friends')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user friends' })
    @ApiResponse({ status: 200, description: 'Return user friends.' })
    async getUserFriends(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
        return this.usersService.getUserFriends(id);
    }

    @Get(':id/blocked')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user blocked users' })
    @ApiResponse({ status: 200, description: 'Return user blocked users.' })
    async getUserBlockedUsers(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
        return this.usersService.getUserBlockedUsers(id);
    }

    @Get(':id/notifications')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user notifications' })
    @ApiResponse({ status: 200, description: 'Return user notifications.' })
    async getUserNotifications(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
        return this.usersService.getUserNotifications(id);
    }

    @Get(':id/orders')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user orders' })
    @ApiResponse({ status: 200, description: 'Return user orders.' })
    async getUserOrders(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
        return this.usersService.getUserOrders(id);
    }

    @Get(':id/addresses')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user addresses' })
    @ApiResponse({ status: 200, description: 'Return user addresses.' })
    async getUserAddresses(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
        return this.usersService.getUserAddresses(id);
    }

    @Get(':id/metrics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user metrics' })
    @ApiResponse({ status: 200, description: 'Return user metrics.' })
    async getUserMetrics(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.usersService.getUserMetrics(id);
    }

    @Get(':id/social-media')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user social media accounts' })
    @ApiResponse({ status: 200, description: 'Return user social media accounts.' })
    async getUserSocialMedia(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
        return this.usersService.getUserSocialMedia(id);
    }

    @Get(':id/professional-achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user professional achievements' })
    @ApiResponse({ status: 200, description: 'Return user professional achievements.' })
    async getUserProfessionalAchievements(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserProfessionalAchievements(id);
    }

} 