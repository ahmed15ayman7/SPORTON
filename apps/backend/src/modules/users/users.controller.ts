import { Controller, Get, Param, Post, Body, ParseIntPipe, UseGuards, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../dtos/User.create.dto';
import { UpdateUserDto } from '../../dtos/User.update.dto';
import { User } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('المستخدمين')
@Controller('users')
export class UsersController extends BaseController<User> {
    constructor(private readonly usersService: UsersService) {
        super(usersService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateUserDto, "المستخدم")
    async create(@Body() data: any): Promise<User> {
        return this.usersService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateUserDto, null, "المستخدم")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<User> {
        return this.usersService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "المستخدمين")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<User>> {
        return this.usersService.findAll(params);
    }
    @Get(":id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "المستخدم")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(id);
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