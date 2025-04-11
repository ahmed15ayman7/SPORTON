import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { FriendshipsService } from './friendships.service';
import { Friendship } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateFriendshipDto } from '@/dtos/Friendship.create.dto';
import { UpdateFriendshipDto } from '@/dtos/Friendship.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('friendships')
@Controller('friendships')
export class FriendshipsController extends BaseController<Friendship> {
    constructor(private readonly friendshipsService: FriendshipsService) {
        super(friendshipsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء علاقة جديدة', 'create', CreateFriendshipDto, null, "العلاقات")
    create(@Body() createFriendshipDto: CreateFriendshipDto) {
        return this.friendshipsService.create(createFriendshipDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث علاقة محددة', 'update', UpdateFriendshipDto, null, "العلاقات")
    update(@Param('id') id: number, @Body() data: any) {
        return this.friendshipsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع العلاقات', 'none', null, null, "العلاقات")
    findAll(@Query() query: PaginationDto) {
        return this.friendshipsService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل العلاقة محددة', 'none', null, null, "العلاقات")
    findOne(@Param('id') id: number) {
        return this.friendshipsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل العلاقة مع جميع العلاقات', 'none', null, null, "العلاقات")
    getFriendshipProfile(@Param('id', ParseIntPipe) id: number) {
        return this.friendshipsService.getFriendshipProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع العلاقات المستخدمة', 'none', null, null, "العلاقات")
    getUserFriendships(@Param('userId', ParseIntPipe) userId: number) {
        return this.friendshipsService.getUserFriendships(userId);
    }

    @Get('accepted/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع العلاقات المقبولة', 'none', null, null, "العلاقات")
    getAcceptedFriendships(@Param('userId', ParseIntPipe) userId: number) {
        return this.friendshipsService.getAcceptedFriendships(userId);
    }

} 