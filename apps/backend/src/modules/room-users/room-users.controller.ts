import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { RoomUsersService } from './room-users.service';
import { RoomUser } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateRoomUserDto } from '@/dtos/RoomUser.create.dto';
import { UpdateRoomUserDto } from '@/dtos/RoomUser.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('الغرف والمستخدمين')
@Controller('room-users')
export class RoomUsersController extends BaseController<RoomUser> {
    constructor(private readonly roomUsersService: RoomUsersService) {
        super(roomUsersService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء غرفة جديدة', 'none', null, CreateRoomUserDto, 'الغرف والمستخدمين')
    create(@Body() createRoomUserDto: CreateRoomUserDto) {
        return this.roomUsersService.create(createRoomUserDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث غرفة', 'none', UpdateRoomUserDto, null, 'الغرف والمستخدمين')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.roomUsersService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الغرف والمستخدمين', 'none', null, null, 'الغرف والمستخدمين')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.roomUsersService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على غرفة بالتفاصيل', 'none', null, null, 'الغرف والمستخدمين')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roomUsersService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الغرف والمستخدمين بالتفاصيل', 'none', null, null, 'الغرف والمستخدمين')
    async getRoomUserProfile(@Param('id', ParseIntPipe) id: number) {
        return this.roomUsersService.getRoomUserProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الغرف والمستخدمين بالتفاصيل', 'none', null, null, 'الغرف والمستخدمين')
    async getUserRoomUsers(@Param('userId', ParseIntPipe) userId: number) {
        return this.roomUsersService.getUserRoomUsers(userId);
    }

    @Get('room/:roomId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الغرف والمستخدمين بالتفاصيل', 'none', null, null, 'الغرف والمستخدمين')
    async getRoomUsers(@Param('roomId', ParseIntPipe) roomId: number) {
        return this.roomUsersService.getRoomUsers(roomId);
    }

    @Get('check/:roomId/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('التحقق من وجود المستخدم في الغرفة', 'none', null, null, 'الغرف والمستخدمين')
    async isUserInRoom(
        @Param('roomId', ParseIntPipe) roomId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.roomUsersService.isUserInRoom(roomId, userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف غرفة', 'none', null, null, 'الغرف والمستخدمين')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.roomUsersService.remove(id);
    }
} 