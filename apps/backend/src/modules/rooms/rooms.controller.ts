import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { RoomsService } from './rooms.service';
import { Room } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController extends BaseController<Room> {
    constructor(private readonly roomsService: RoomsService) {
        super(roomsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get room profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return room profile.' })
    async getRoomProfile(@Param('id', ParseIntPipe) id: number) {
        return this.roomsService.getRoomProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user rooms' })
    @ApiResponse({ status: 200, description: 'Return user rooms.' })
    async getUserRooms(@Param('userId', ParseIntPipe) userId: number) {
        return this.roomsService.getUserRooms(userId);
    }

    @Post(':roomId/users/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add user to room' })
    @ApiResponse({ status: 200, description: 'User has been added to room.' })
    async addUserToRoom(
        @Param('roomId', ParseIntPipe) roomId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.roomsService.addUserToRoom(roomId, userId);
    }

    @Delete(':roomId/users/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remove user from room' })
    @ApiResponse({ status: 200, description: 'User has been removed from room.' })
    async removeUserFromRoom(
        @Param('roomId', ParseIntPipe) roomId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.roomsService.removeUserFromRoom(roomId, userId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new room' })
    @ApiResponse({ status: 201, description: 'The room has been successfully created.' })
    async create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

} 