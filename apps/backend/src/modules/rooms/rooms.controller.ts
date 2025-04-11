import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { RoomsService } from './rooms.service';
import { Room } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateRoomDto } from '@/dtos/Room.create.dto';
import { UpdateRoomDto } from '@/dtos/Room.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('rooms')
@Controller('rooms')
export class RoomsController extends BaseController<Room> {
    constructor(private readonly roomsService: RoomsService) {
        super(roomsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء غرفة جديدة', 'none', null, CreateRoomDto, 'الغرف والمستخدمين')
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث غرفة', 'none', UpdateRoomDto, null, 'الغرف والمستخدمين')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.roomsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الغرف', 'none', null, null, 'الغرف والمستخدمين')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.roomsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الغرفة بالتفاصيل', 'none', null, null, 'الغرف والمستخدمين')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الغرفة بالتفاصيل', 'none', null, null, 'الغرف والمستخدمين')
    async getRoomProfile(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.getRoomProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الغرف الخاصة بالمستخدم', 'none', null, null, 'الغرف والمستخدمين')
    async getUserRooms(@Param('userId', ParseIntPipe) userId: number) {
        return this.roomsService.getUserRooms(userId);
    }

    @Post(':roomId/users/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة مستخدم إلى الغرفة', 'none', null, null, 'الغرف والمستخدمين')
    async addUserToRoom(
        @Param('roomId', ParseIntPipe) roomId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.roomsService.addUserToRoom(roomId, userId);
    }

    @Delete(':roomId/users/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إزالة مستخدم من الغرفة', 'none', null, null, 'الغرف والمستخدمين')
    async removeUserFromRoom(
        @Param('roomId', ParseIntPipe) roomId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.roomsService.removeUserFromRoom(roomId, userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف غرفة', 'none', null, null, 'الغرف والمستخدمين')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.remove(id);
    }

} 