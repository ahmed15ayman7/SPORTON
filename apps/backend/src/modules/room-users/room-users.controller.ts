import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { RoomUsersService } from './room-users.service';
import { RoomUser } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateRoomUserDto } from './dto/create-room-user.dto';
import { UpdateRoomUserDto } from './dto/update-room-user.dto';

@ApiTags('room-users')
@Controller('room-users')
export class RoomUsersController extends BaseController<RoomUser> {
    constructor(private readonly roomUsersService: RoomUsersService) {
        super(roomUsersService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get room user profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return room user profile.' })
    async getRoomUserProfile(@Param('id', ParseIntPipe) id: number) {
        return this.roomUsersService.getRoomUserProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user room users' })
    @ApiResponse({ status: 200, description: 'Return user room users.' })
    async getUserRoomUsers(@Param('userId', ParseIntPipe) userId: number) {
        return this.roomUsersService.getUserRoomUsers(userId);
    }

    @Get('room/:roomId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get room users' })
    @ApiResponse({ status: 200, description: 'Return room users.' })
    async getRoomUsers(@Param('roomId', ParseIntPipe) roomId: number) {
        return this.roomUsersService.getRoomUsers(roomId);
    }

    @Get('check/:roomId/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Check if user is in room' })
    @ApiResponse({ status: 200, description: 'Return whether user is in room.' })
    async isUserInRoom(
        @Param('roomId', ParseIntPipe) roomId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.roomUsersService.isUserInRoom(roomId, userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new room user' })
    @ApiResponse({ status: 201, description: 'The room user has been successfully created.' })
    async create(@Body() createRoomUserDto: CreateRoomUserDto) {
        return this.roomUsersService.create(createRoomUserDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a room user' })
    @ApiResponse({ status: 200, description: 'The room user has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRoomUserDto: UpdateRoomUserDto,
    ) {
        return this.roomUsersService.update(id, updateRoomUserDto);
    }
} 